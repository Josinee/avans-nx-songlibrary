import { Controller } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IAlbum } from '@avans-nx-songlibrary/api';
import { CreateSongDto } from '@avans-nx-songlibrary/backend/dto';

@Controller('album')
export class AlbumController {
    constructor(private albumService: AlbumService) {}

    @Get('')
    getAll(): Promise<IAlbum[]> {
        console.log("getALl in album controller")
        return this.albumService.getAll();
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
