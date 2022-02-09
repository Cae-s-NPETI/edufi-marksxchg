import { Headers, BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Query, Req, MethodNotAllowedException, Put } from '@nestjs/common';
import { OldTrade, OngoingTrade, Trade } from './trades.entity';

type PartialTradeToken = { tokenType: string, quantity: number }
interface PartialTradeParam {
    offerToken: PartialTradeToken;
    returnToken: PartialTradeToken;
    message: string;
}

@Controller('trades')
export class TradesController {
    @Get()
    async getTrades(
        @Query("skip") skip,
        @Query("limit") limit
    ) {
        return (await OngoingTrade.find(
            { relations: ["trade"], order: { trade: "DESC" } }
        )).map((on) => on.trade);
    }

    @Post()
    async addTrade(
        @Body() body: PartialTradeParam,
        @Headers('student-id') hStudentId: string
    ) {
        console.log("run")
        let trade = Trade.create();

        if (!body.offerToken || !body.returnToken) {
            throw new BadRequestException("Missing token params");
        }

        let studentId = parseInt(hStudentId);
        if (isNaN(studentId)) {
            throw new BadRequestException("Student ID invalid");
        }

        trade.authorId = parseInt(hStudentId);
        trade.offerTokenType = body.offerToken.tokenType;
        trade.offerTokenQuantity = body.offerToken.quantity;
        trade.returnTokenType = body.returnToken.tokenType;
        trade.returnTokenQuantity = body.returnToken.quantity;
        trade.message = body.message ?? "";

        let ongoing = OngoingTrade.create();
        ongoing.trade = trade;

        // save
        await trade.save();
        await ongoing.save();

        console.log("save")

        let allTrades = (await OngoingTrade.find(
            { relations: ["trade"] }
        )).map((on) => on.trade);

        // Find an offer with the same ratio
        let found: Trade | null = null;
        let findRatio = trade.offerTokenQuantity / trade.returnTokenQuantity;
        for (let t of allTrades) {
            // TODO: if not same user
            if (trade.offerTokenType == t.returnTokenType
                && trade.returnTokenType == t.offerTokenType
                // Not itself
                && trade.id != t.id) {
                let ratio = t.returnTokenQuantity / t.offerTokenQuantity;
                console.log("teste", ratio, findRatio, trade.id, t.id);
                if (ratio == findRatio) {
                    found = t;
                    break;
                }
            }
        }

        if (!found) {
            return;
        }

        console.log("found a same ratios.");

        let oldTradeOfferQty = trade.offerTokenQuantity;
        let oldFoundOfferQty = found.offerTokenQuantity;

        // Apply the differences
        trade.applyFufil(found);

        if (trade.offerTokenQuantity == 0) {
            this.serviceDeleteTrade(trade.id);

            // save a history record
            let oldTrade = OldTrade.create();
            oldTrade.tradeAuthorId = trade.id;
            oldTrade.tradeFulfilId = found.id;
            oldTrade.authorOfferQuantity = oldTradeOfferQty;
            oldTrade.fufilOfferQuantity = oldFoundOfferQty;
            oldTrade.save();
        } else {
            trade.save();
        }

        if (found.offerTokenQuantity == 0) {
            this.serviceDeleteTrade(found.id);

            // save a history record
            let oldTrade = OldTrade.create();
            // Swapped order!
            oldTrade.tradeAuthorId = found.id;
            oldTrade.tradeFulfilId = trade.id;
            oldTrade.authorOfferQuantity = oldFoundOfferQty;
            oldTrade.fufilOfferQuantity = oldTradeOfferQty;
            oldTrade.save();
        } else {
            found.save();
        }


    }

    // I know I should be putting this in a service..
    async serviceDeleteTrade(id: number, studentId?: number) {
        let oTrade = await OngoingTrade.findOne({
            where: {
                tradeId: id
            }
        });
        if (!oTrade) {
            throw new NotFoundException('Trade ID not found ' + id);
        }

        // Assert student id if needed
        if (studentId) {
            let trade = await Trade.findOne({
                where: {
                    id: id
                }
            });

            // if the author is not the student, don't allow deleting
            if (trade.authorId != studentId) {
                throw new MethodNotAllowedException("You are not the author of this trade.");
            }
        }

        // rmv
        await oTrade.remove();
    }

    @Put(":id")
    async updateTrade(
        @Headers('student-id') hStudentId: string,
        @Body() body: PartialTradeParam,
        @Param('id', ParseIntPipe) id: number
    ) {
        let studentId = parseInt(hStudentId);
        if (isNaN(studentId)) {
            throw new BadRequestException("Student ID invalid");
        }

        if (!body.offerToken || !body.returnToken) {
            throw new BadRequestException("Missing token params");
        }

        let trade = await Trade.findOne({
            where: {
                id: id
            }
        });

        // if the author is not the student, don't allow deleting
        if (trade.authorId != studentId) {
            throw new MethodNotAllowedException("You are not the author of this trade.");
        }

        trade.authorId = parseInt(hStudentId);
        trade.offerTokenType = body.offerToken.tokenType;
        trade.offerTokenQuantity = body.offerToken.quantity;
        trade.returnTokenType = body.returnToken.tokenType;
        trade.returnTokenQuantity = body.returnToken.quantity;
        trade.message = body.message ?? "";

        trade.save();
    }

    @Delete(":id")
    async deleteTrade(
        @Headers('student-id') hStudentId: string,
        @Param('id', ParseIntPipe) id: number
    ) {
        let studentId = parseInt(hStudentId);
        if (isNaN(studentId)) {
            throw new BadRequestException("Student ID invalid");
        }

        await this.serviceDeleteTrade(id, studentId);
    }
}
