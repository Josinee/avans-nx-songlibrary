import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ISong } from '@avans-nx-songlibrary/api';
import { Song } from './song.schema';
import { CreateSongDto } from '@avans-nx-songlibrary/backend/dto';

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

    async getAllByAlbum(album: string): Promise<ISong[]> {
        return this.songModel.find({ album }).exec();
    }

    async getAll(artist?: string): Promise<ISong[]> {
        if (artist) {
            return this.songModel.find({ artist }).select('title artist album duration').populate({path: 'album', select: "_id title"}).exec();
        }
        return this.songModel.find().select('title artist album duration').populate({ path: 'artist', select: '_id name' }).populate({ path: 'album', select: '_id title' }).exec();
    }

    async getOne(id: string): Promise<ISong> {
        const song = await this.songModel.findById(id).populate('artist').populate('album').exec();
        if (!song) {
            throw new NotFoundException(`Song could not be found!`);
        }
        return song as ISong;
    }
}
