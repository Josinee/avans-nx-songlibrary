import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ISong } from '@avans-nx-songlibrary/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { Song } from './song.schema';
import { CreateSongDto } from '@avans-nx-songlibrary/backend/dto';
//import { CreateCatDto } from './dto/create-cat.dto';


const httpOptions = {
    observe: 'body',
    responseType: 'json' as const
};

@Injectable()
export class SongService {
    TAG = 'SongService';
    constructor(@InjectModel(Song.name) private songModel: Model<Song>) {}
        
    
    async create(createSongDto: CreateSongDto): Promise<Song> {
        const createdSong = new this.songModel(createSongDto);
        return createdSong.save();
    }

    async getAll(): Promise<ISong[]> {
        return this.songModel.find().populate('artist').populate('album').exec();
    }

    async getOne(id: string): Promise<ISong> {
        const song = await this.songModel.findById(id).exec();
        if (!song) {
            throw new NotFoundException(`Song could not be found!`);
        }
        return song as ISong;
    }

}
