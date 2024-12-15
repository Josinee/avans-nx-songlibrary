import { Controller, Query } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IAlbum } from '@avans-nx-songlibrary/api';
import { CreateSongDto } from '@avans-nx-songlibrary/backend/dto';

@Controller('album')
export class AlbumController {
    constructor(private albumService: AlbumService) {}

    @Get('')
    async getAll(@Query('startDate') dateOfRelease?: string): Promise<IAlbum[]> {
        console.log('Fetching albums with dateOfRelease filter', dateOfRelease);

        if (dateOfRelease) {
            return this.albumService.getAll(dateOfRelease);
        }

        return this.albumService.getAll(); // return all albums if no filter
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<IAlbum> {
        return this.albumService.getOne(id);
    }

    // @Post('')
    // create(@Body() data: CreateSongDto): Promise<ISong> {
    //     return this.songService.create(data);
    // }
}
