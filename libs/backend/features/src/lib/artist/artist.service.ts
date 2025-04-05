import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IArtist } from '@avans-nx-songlibrary/api';
import { Artist } from './artist.schema';
import { CreateArtistDto } from '@avans-nx-songlibrary/backend/dto';

@Injectable()
export class ArtistService {
    TAG = 'ArtistService';
    constructor(@InjectModel(Artist.name) private artistModel: Model<Artist>) {}

    async getAll(): Promise<IArtist[]> {
        return this.artistModel.find().exec();
    }

    async getOne(id: string): Promise<IArtist> {
        const artist = await this.artistModel.findById(id).exec();
        if (!artist) {
            throw new NotFoundException(`Artist could not be found!`);
        }
        return artist as IArtist;
    }


    async create(createArtistDto: CreateArtistDto): Promise<Artist> {
        const createdArtist = new this.artistModel(createArtistDto);
        return createdArtist.save();
    }
    
}
