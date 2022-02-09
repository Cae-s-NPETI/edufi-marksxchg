import { Controller, Get, Query } from '@nestjs/common';
import { OldTrade } from 'src/trades/trades.entity';

@Controller('tradeHistory')
export class TradeHistoryController {
    @Get()
    async getTrades(
        @Query("skip") skip,
        @Query("limit") limit
    ) {
        return (await OldTrade.find({
            relations: ["tradeAuthor", "tradeFulfil"],
            order: {
                dateFulfilled: "DESC"
            }
        }));
    }
}
