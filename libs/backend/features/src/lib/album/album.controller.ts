import { Body, Controller, Post, Put, Query } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Get, Param } from '@nestjs/common';
import { IAlbum } from '@avans-nx-songlibrary/api';
import { CreateAlbumDto, UpdateAlbumDto } from '@avans-nx-songlibrary/backend/dto';

@Controller('album')
export class AlbumController {
    constructor(private albumService: AlbumService) {}

    @Get('')
    async getAll(@Query('startDate') dateOfRelease?: string, @Query('artist') artist?: string): Promise<IAlbum[]> {
        console.log('Fetching albums with filters:', { dateOfRelease, artist });
        return this.albumService.getAll({ dateOfRelease, artist });
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<IAlbum> {
        return this.albumService.getOne(id);
    }

    @Post('') 
    create(@Body() data: CreateAlbumDto): Promise<IAlbum> {
        return this.albumService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: UpdateAlbumDto): Promise<IAlbum> {
      return this.albumService.update(id, data);
    }
}
