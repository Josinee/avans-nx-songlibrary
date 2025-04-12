import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Neo4JService } from './neo4j-songs.service';
import { promises } from 'dns';

@Controller('songs')
export class Neo4JController {
    constructor(private readonly neo4jService: Neo4JService) {}

    @Get('match')
    async matchSimilar(): Promise<any> {
        await this.neo4jService.matchSimilar();
    }
    
    // @Get('')
    // async getAll(): Promise<any> {
    //     const results = await this.neo4jService.findAll();
    //     return results;
    // }

    // @Get(':song')
    // async getSimilar(@Param('song') song: string): Promise<any> {
    //     const results = await this.neo4jService.findSimilar(song);
    //     return results;
    // }

    @Get('recommendations/:user')
    async getRecommendationsForUser(@Param('user') user: string): Promise<any> {
        const results = await this.neo4jService.getRecommendationsFromUser(user);

        return results;
    }



    @Post('')
    async postSong(@Body() body: {song: { id: string, title: string, genre: string, artist: string, album?: string}}): Promise<any> {
        if(!body.song) {
            throw new Error('No song found');
        }
        console.log("song controller neo" + body.song + body.song.id + body.song.album, body.song.artist, body.song.genre, body.song.title)
        await this.neo4jService.postSong(body.song);

        return {}
    }

    @Post('user')
    async postUser(@Body() user: { id: string, username?: string}): Promise<any> {
        if(user) {
            await this.neo4jService.postUser(user);
        }
    }

    @Put()
    async putLikedSong(@Body() body: { user: { id: string; username?: string }, song: { id: string; title?: string, genre?: string, artist?: string, album?: string} }): Promise<any> {
        const { user, song } = body;

        if (!user || !song) {
            throw new Error('Both user and song are required in the request body');
        }
        console.log("song controller neo"+ song.id + song.album, song.artist, song.genre, song.title)
        await this.neo4jService.putLikedSong(user, song);

        return { message: 'Relationship created or already exists' };
    }


    @Delete(':song/:user')
    async deleteLikedSong(@Param('song') song: string, @Param('user') user: string): Promise<any> {
        return await this.neo4jService.deleteLikedSong(song, user);
    }
}
