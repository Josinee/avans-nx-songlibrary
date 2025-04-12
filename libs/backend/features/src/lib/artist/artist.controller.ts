import { Body, Controller, Post } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Get, Param } from '@nestjs/common';
import { IArtist } from '@avans-nx-songlibrary/api';
import { CreateArtistDto } from '@avans-nx-songlibrary/backend/dto';

@Controller('artist')
export class ArtistController {
    constructor(private artistService: ArtistService) {}

    @Get('')
    getAll(): Promise<IArtist[]> {
        return this.artistService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<IArtist> {
        return this.artistService.getOne(id);
    }

    @Post('')
    create(@Body() data: CreateArtistDto): Promise<IArtist> {
        return this.artistService.create(data);
    }
}
