import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './env';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: env.NODE_ENV === 'dev' ? ['log'] : [],
  });

  app.enableCors({
    origin: env.ALLOW_CORS.split(','),
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(env.PORT);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
