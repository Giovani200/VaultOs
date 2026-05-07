import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173', 'https://vault-os-delta.vercel.app', 'https://unparsimonious-maximus-isocheimic.ngrok-free.dev'],
    methods: ['GET', 'POST', 'OPTIONS'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();