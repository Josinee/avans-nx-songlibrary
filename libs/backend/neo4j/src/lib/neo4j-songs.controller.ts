import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
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
    async getSimilar(@Param('song') song: string): Promise<any> {
        const results = await this.neo4jService.findSimilar(song);
        return results;
    }

    @Get('recommendations/:user')
    async getRecommendationsForUser(@Param('user') user: string): Promise<any> {
        const results = await this.neo4jService.getRecommendationsFromUser(user);
        return results;
    }

    @Put()
    async putLikedSong(@Body() body: { user: { id: string; username?: string }, song: { id: string; title?: string, genre?: string, artist?: string, album?: string} }): Promise<any> {
        const { user, song } = body;

        if (!user || !song) {
            throw new Error('Both user and song are required in the request body');
        }

        await this.neo4jService.putLikedSong(user, song);

        return { message: 'Relationship created or already exists' };
    }


    @Delete(':song/:user')
    async deleteLikedSong(@Param('user') song: string, @Param('song') user: string): Promise<any> {
        await this.neo4jService.deleteLikedSong(user, song);
    }
}
