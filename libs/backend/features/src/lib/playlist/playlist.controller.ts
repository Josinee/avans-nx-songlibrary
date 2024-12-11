import { Controller, Put, Get, Param, Post, Delete, Body, UseGuards } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { IPlaylist } from '@avans-nx-songlibrary/api';
import { CreatePlaylistDto, UpdatePlaylistDto } from '@avans-nx-songlibrary/backend/dto';
import { AuthGuard } from '@avans-nx-songlibrary/backend/auth'
//import { UserExistGuard } from '../user/user-exists.guard';


@Controller('playlist')
@UseGuards(AuthGuard)
export class PlaylistController {
    constructor(private playlistService: PlaylistService) {}

    @Get('')
    //@UseGuards(UserExistGuard)
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

    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.playlistService.delete(id);
    }
}
