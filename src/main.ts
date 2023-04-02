import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { isNodeEnv } from './lib/utils';
import cookieParser from 'cookie-parser';
import compression from 'compression';

async function bootstrap() {
  const port = process.env.PORT || 6000;
  console.log(`[${port}] ENVIRONMENT: ${process.env.NODE_ENV}`);
  process.env.NODE_ENV = process.env.NODE_ENV || 'local';

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: isNodeEnv('local') ? undefined : ['error', 'warn'],
  });
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'prod' ? ['https://platform.willog.io'] : true,
    credentials: true,
  });
  app.use(cookieParser());
  app.use(compression());

  await app.listen(port);
}
bootstrap();
