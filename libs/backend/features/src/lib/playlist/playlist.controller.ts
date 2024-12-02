import { Controller } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IPlaylist } from '@avans-nx-songlibrary/api';
import { CreatePlaylistDto } from '@avans-nx-songlibrary/backend/dto';

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
}
