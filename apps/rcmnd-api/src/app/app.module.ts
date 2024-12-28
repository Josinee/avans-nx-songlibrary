import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule, Neo4jScheme } from 'nest-neo4j'
import { Neo4jBackendModule } from '../../../../libs/backend/neo4j/src/index'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [Neo4jModule.forRoot({
    scheme: process.env.NEO4J_DB_SCHEME as Neo4jScheme,
    database: process.env.NEO4j_DB_NAME,
    host: process.env.NEO4J_DB_CONNECTION_STRING,
    port: '7687',
    username: 'neo4j',
    password: process.env.NEO4J_DB_PASSWORD,
  }), Neo4jBackendModule, ConfigModule.forRoot({isGlobal: true}), ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
