import { Controller, Put, Get, Param, Post, Body } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { IPlaylist } from '@avans-nx-songlibrary/api';
import { CreatePlaylistDto, UpdatePlaylistDto } from '@avans-nx-songlibrary/backend/dto';

@Controller('playlist')
export class PlaylistController {
    constructor(private playlistService: PlaylistService) {}

    @Get('')
    getAll(): Promise<IPlaylist[]> {
        return this.playlistService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<IPlaylist> {
        return this.playlistService.getOne(id);
    }

    @Post('')
    create(@Body() data: CreatePlaylistDto): Promise<IPlaylist> {
        return this.playlistService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto): Promise<IPlaylist>{
        console.log('update')
        return this.playlistService.update(id, updatePlaylistDto)
    }
}
