import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true });
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: { retryAttempts: 5, retryDelay: 1000 },
  });
  const port = process.env.PORT || 4547;
  await app.listen(port);
}
bootstrap();
