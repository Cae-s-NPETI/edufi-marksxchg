import { Controller, Get } from '@nestjs/common';

@Controller('trades')
export class TradesController {
    @Get()
    getTrades() {
        return {id:4,a:"As"};
    }
}
