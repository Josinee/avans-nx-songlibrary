import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from 'nest-neo4j'
import { Neo4jBackendModule } from '../../../../libs/backend/neo4j/src/index'
import { environment } from '@avans-nx-songlibrary/shared/util-env';

@Module({
  imports: [Neo4jModule.forRoot({
    scheme: 'neo4j+s',
    database: environment.NEO4J_DB_DATABASE_NAME,
    host: environment.NEO4J_DB_CONNECTION_STRING,
    port: 7687,
    username: 'neo4j',
    password: environment.NEO4J_DB_PASSWORD,
  }), Neo4jBackendModule ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
