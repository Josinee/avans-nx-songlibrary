import { Controller } from '@nestjs/common';
import { SongService } from './song.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { ISong } from '@avans-nx-songlibrary/api';
import { CreateSongDto } from '@avans-nx-songlibrary/backend/dto';

@Controller('song')
export class SongController {
    constructor(private songService: SongService) {}

    @Get('')
    getAll(): ISong[] {
        return this.songService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): ISong {
        return this.songService.getOne(id);
    }

    @Post('')
    create(@Body() data: CreateSongDto): ISong {
        return this.songService.create(data);
    }
}
