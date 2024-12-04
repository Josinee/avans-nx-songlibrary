import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IArtist } from '@avans-nx-songlibrary/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { Artist } from './artist.schema';
import { CreateSongDto } from '@avans-nx-songlibrary/backend/dto';
//import { CreateCatDto } from './dto/create-cat.dto';


const httpOptions = {
    observe: 'body',
    responseType: 'json' as const
};

@Injectable()
export class ArtistService {
    TAG = 'ArtistService';
    constructor(@InjectModel(Artist.name) private artistModel: Model<Artist>) {}
        
    
    // async create(createSongDto: CreateSongDto): Promise<Song> {
    //     const createdSong = new this.songModel(createSongDto);
    //     return createdSong.save();
    // }

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

}
