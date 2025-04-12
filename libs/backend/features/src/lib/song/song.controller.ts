import { Controller, Put, Query } from '@nestjs/common';
import { SongService } from './song.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { ISong } from '@avans-nx-songlibrary/api';
import { CreateSongDto, UpdateSongDto } from '@avans-nx-songlibrary/backend/dto';

@Controller('song')
export class SongController {
    constructor(private songService: SongService) {}

    @Get('')
    getAll(@Query('artist') artistParam?: string, @Query('album') albumParam?: string): Promise<ISong[]> {
        return this.songService.getAll(artistParam, albumParam);
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<ISong> {
        return this.songService.getOne(id);
    }

    @Post('')
    create(@Body() data: CreateSongDto): Promise<ISong> {
        return this.songService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: UpdateSongDto): Promise<ISong>{
        return this.songService.update(id, data)
    }
}
 