import { Body, Controller, Get, ParseIntPipe, Query, Req } from '@nestjs/common';
import { OngoingTrade, Trade } from './trades.entity';

type PartialTradeToken = { tokenType: string, quantity: number }
interface PartialTradeParam {
    offerToken: PartialTradeToken;
    returnToken: PartialTradeToken;
}

@Controller('trades')
export class TradesController {
    @Get()
    async getTrades(
        @Query("skip") skip,
        @Query("limit") limit
    ) {
        return (await OngoingTrade.find(
            { relations: ["trade"] }
        )).map((on) => on.trade);
    }

    @Get()
    async addTrade(@Body() body: PartialTradeParam) {
        let trade = Trade.create();

        trade.authorId = 1; //tmp
        trade.offerTokenType = body.offerToken.tokenType;
        trade.offerTokenQuantity = body.offerToken.quantity;
        trade.returnTokenType = body.returnToken.tokenType;
        trade.returnTokenQuantity = body.returnToken.quantity;

        let ongoing = OngoingTrade.create();
        ongoing.trade = trade;
        await ongoing.save();

        // todo: auto fill
    }
}
