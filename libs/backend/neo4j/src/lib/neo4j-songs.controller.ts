import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { Neo4JService } from './neo4j-songs.service';

@Controller('songs')
export class Neo4JController {
    constructor(private readonly neo4jService: Neo4JService) {}

    @Get('')
    async getAll(): Promise<any> {
        const results = await this.neo4jService.findAll();
        return results;
    }

    @Get(':song')
    async getSimilar(@Param('song') song : string): Promise<any> {
        const results = await this.neo4jService.findSimilar(song);
        console.log("hoi ", song);
        return results
    }

    @Get('recommendations/:user')
    async getRecommendationsForUser(@Param('user') user: string): Promise<any> {
        const results = await this.neo4jService.getRecommendationsFromUser(user);
        return results;
    }

    @Put(':song/:user')
    async putLikedSong(@Param('user') song: string, @Param('song') user: string): Promise<any> {
        console.log("put liked song in controller");
        await this.neo4jService.putLikedSong(user, song);
    }

    @Delete(':song/:user')
    async deleteLikedSong(@Param('user') song: string, @Param('song') user: string): Promise<any> {
        console.log("delete deleted song in controller");
        await this.neo4jService.deleteLikedSong(user, song);
    }
}
