import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from 'nest-neo4j'
import { Neo4jBackendModule } from '../../../../libs/backend/neo4j/src/index'
import { environment } from '@avans-nx-songlibrary/shared/util-env';
import { env } from 'process';

@Module({
  imports: [Neo4jModule.forRoot({
    scheme: 'neo4j',
    database: 'neo4j',
    host: '1b1e492e.databases.neo4j.io',
    port: 7687,
    username: 'neo4j',
    password: 'bH7kKQvOOmsFoXlUzl1Z8HfUT1i-uM3wRww9zOVYEpM',
  }), Neo4jBackendModule ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
