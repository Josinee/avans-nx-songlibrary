import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from 'nest-neo4j'
import { Neo4jBackendModule } from '../../../../libs/backend/neo4j/src/index'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [Neo4jModule.forRoot({
    scheme: 'neo4j+s',
    host: process.env.NEO4J_DB_CONNECTION_STRING,
    port: '7687',
    username: 'neo4j',
    password: process.env.NEO4J_DB_PASSWORD,
  }), Neo4jBackendModule, ConfigModule.forRoot({isGlobal: true}), ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
