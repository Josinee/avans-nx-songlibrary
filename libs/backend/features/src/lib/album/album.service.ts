import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IAlbum } from '@avans-nx-songlibrary/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { Album } from './album.schema';
import { CreateSongDto } from '@avans-nx-songlibrary/backend/dto';


const httpOptions = {
    observe: 'body',
    responseType: 'json' as const
};

@Injectable()
export class AlbumService {
    TAG = 'AlbumService';
    constructor(@InjectModel(Album.name) private albumModel: Model<Album>) {}
        
    
    // async create(createSongDto: CreateSongDto): Promise<Song> {
    //     const createdSong = new this.songModel(createSongDto);
    //     return createdSong.save();
    // }

    async getAll(): Promise<IAlbum[]> {
        return this.albumModel.find().exec();
    }

    async getOne(id: string): Promise<IAlbum> {
        const album = await this.albumModel.findById(id).exec();
        if (!album) {
            throw new NotFoundException(`Album could not be found!`);
        }
        return album as IAlbum;
    }

}
