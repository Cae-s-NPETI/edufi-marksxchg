import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Connect to redis server
  app.connectMicroservice<MicroserviceOptions>(
    {
      options: {
        url: config.REDIS_URL,
      },
      transport: Transport.REDIS,
    },
  );

  await app.startAllMicroservices();
  await app.listen(9165);
}
bootstrap();
