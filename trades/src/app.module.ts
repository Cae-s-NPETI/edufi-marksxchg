import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TradesController } from './trades/trades.controller';
import config from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { OldTrade, OngoingTrade, Trade } from './trades/trades.entity';
import { TradeHistoryController } from './trade-history/trade-history.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TRADES_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: config.REDIS_URL,
        }
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.MYSQL_HOST,
      port: config.MYSQL_PORT,
      username: 'root',
      password: config.MYSQL_PASS,
      database: 'edufi_marks_xchg',
      autoLoadEntities: true,
      //entities: ["dist/**/*.entity{.ts,.js}"],
      //synchronize: true,
      // https://stackoverflow.com/a/59356623
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([Trade, OngoingTrade, OldTrade]),
  ],
  controllers: [AppController, TradesController, TradeHistoryController],
  providers: [AppService],
})
export class AppModule {}
