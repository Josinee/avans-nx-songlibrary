import { Controller } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Get, Param } from '@nestjs/common';
import { IArtist } from '@avans-nx-songlibrary/api';

@Controller('artist')
export class ArtistController {
    constructor(private artistService: ArtistService) {}

    @Get('')
    getAll(): Promise<IArtist[]> {
        console.log('getALl in artist controller');
        return this.artistService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<IArtist> {
        return this.artistService.getOne(id);
    }
}
