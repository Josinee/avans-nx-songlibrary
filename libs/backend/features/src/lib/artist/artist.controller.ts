import { Controller } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IArtist } from '@avans-nx-songlibrary/api';
import { CreateSongDto } from '@avans-nx-songlibrary/backend/dto';

@Controller('artist')
export class ArtistController {
    constructor(private artistService: ArtistService) {}

    @Get('')
    getAll(): Promise<IArtist[]> {
        console.log("getALl in artist controller")
        return this.artistService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<IArtist> {
        return this.artistService.getOne(id);
    }

    // @Post('')
    // create(@Body() data: CreateSongDto): Promise<ISong> {
    //     return this.songService.create(data);
    // }
}
