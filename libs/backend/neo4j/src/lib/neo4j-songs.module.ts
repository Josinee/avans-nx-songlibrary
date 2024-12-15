import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j';
import { Neo4JController } from './neo4j-songs.controller';
import { Neo4JService } from './neo4j-songs.service';

@Module({
    imports: [Neo4jModule],
    controllers: [Neo4JController],
    providers: [Neo4JService],
    exports: []
})
export class Neo4jBackendModule {}
