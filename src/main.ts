import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from '../config/default';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(config.api_port || 3000);
}
bootstrap();
