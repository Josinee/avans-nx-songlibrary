import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from 'nest-neo4j'
import { Neo4jBackendModule } from '../../../../libs/backend/neo4j/src/index'

@Module({
  imports: [Neo4jModule.forRoot({
    scheme: 'neo4j',
    database: 'recommendations',
    host: 'localhost',
    port: 7687,
    username: 'neo4j',
    password: 'Wachtwoord'
  }), Neo4jBackendModule ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
