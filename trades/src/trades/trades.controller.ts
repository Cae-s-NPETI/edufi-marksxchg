import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Query, Req } from '@nestjs/common';
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
    async addTrade(@Body() body: PartialTradeParam) {
        console.log("run")
        let trade = Trade.create();

        if (!body.offerToken || !body.returnToken) {
            throw new BadRequestException("Missing token params");
        }

        trade.authorId = 1; //tmp
        trade.offerTokenType = body.offerToken.tokenType;
        trade.offerTokenQuantity = body.offerToken.quantity;
        trade.returnTokenType = body.returnToken.tokenType;
        trade.returnTokenQuantity = body.returnToken.quantity;
        trade.message = body.message;

        let ongoing = OngoingTrade.create();
        ongoing.trade = trade;

        // save
        await trade.save();
        await ongoing.save();

        console.log("save")

        // todo: auto fill
        let allTrades = (await OngoingTrade.find(
            { relations: ["trade"] }
        )).map((on) => on.trade);

        // Find an offer with the same ratio
        let found: Trade | null = null;
        let findRatio = trade.offerTokenQuantity / trade.returnTokenQuantity;
        for (let t of allTrades) {
            // TODO: if not same user
            if (trade.offerTokenType == t.returnTokenType
                && trade.returnTokenType == t.offerTokenType) {
                let ratio = t.offerTokenQuantity / t.returnTokenQuantity;
                if (ratio == findRatio) {
                    found = t;
                    break;
                }
            }
        }

        if (!found) {
            return;
        }

        let offerDiff = Math.abs(trade.offerTokenQuantity - found.returnTokenQuantity);
        let returnDiff = Math.abs(trade.returnTokenQuantity - found.offerTokenQuantity);

        trade.offerTokenQuantity -= offerDiff;
        trade.returnTokenQuantity -= returnDiff;

        found.offerTokenQuantity -= returnDiff;
        found.returnTokenQuantity -= offerDiff;

        if (trade.offerTokenQuantity == 0) {
            trade.remove();
        }
        if (found.offerTokenQuantity == 0) {
            found.remove();
        }

        // save a history record
        let oldTrade = OldTrade.create();
        oldTrade.tradeAuthorId = trade.authorId;
        oldTrade.tradeFulfilId = found.authorId;
        oldTrade.save();
    }

    @Delete(":id")
    async deleteTrade(@Param('id', ParseIntPipe) id: number) {
        let oTrade = await OngoingTrade.findOne();
        if (!oTrade) {
            throw new NotFoundException('Trade ID not found ' + id);
        }

        // rmv
        await oTrade.remove();


    }
}
