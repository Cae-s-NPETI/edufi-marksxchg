import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
