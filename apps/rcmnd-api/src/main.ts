import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ApiResponseInterceptor } from '@avans-nx-songlibrary/backend/dto'
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  Logger.log('conn',process.env.NEO4J_DB_CONNECTION_STRING)
  Logger.log('name',process.env.NEO4J_DB_NAME)
  Logger.log('pass',process.env.NEO4J_DB_PASSWORD)
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const corsOptions: CorsOptions = {};
  app.enableCors(corsOptions);

  app.useGlobalInterceptors(new ApiResponseInterceptor());


  const port = process.env.PORT || 3100;
  await app.listen(port);
  Logger.log(
    `🚀 rcmnd-api is running on: http://localhost:${port}/${globalPrefix}`
  );
  console.log('Environment variables:');
console.log('Connection String:', process.env.NEO4J_DB_CONNECTION_STRING);
console.log('Database Name:', process.env.NEO4J_DB_NAME);
console.log('Password:', process.env.NEO4J_DB_PASSWORD);
}

bootstrap();
