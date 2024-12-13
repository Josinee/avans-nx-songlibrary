import { Controller, Get } from '@nestjs/common';
import { Neo4JService } from './neo4j-songs.service';

@Controller('songs')
export class Neo4JController {
    constructor(private readonly neo4jService: Neo4JService) {}

    @Get('')
    async getAll(): Promise<any> {
        const results = await this.neo4jService.findAll();
        return results;
    }
}
