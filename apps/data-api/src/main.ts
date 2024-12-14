/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ApiResponseInterceptor } from '@avans-nx-songlibrary/backend/dto'
import { environment } from '@avans-nx-songlibrary/shared/util-env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const corsOptions: CorsOptions = {};
  app.enableCors(corsOptions);

  app.useGlobalInterceptors(new ApiResponseInterceptor());


  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 data-api is running on: http://localhost:${port}/${globalPrefix} with ${environment.MONGO_DB_CONNECTION_STRING}`
  );
}

bootstrap();
