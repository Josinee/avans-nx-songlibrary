import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IAlbum } from '@avans-nx-songlibrary/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { Album } from './album.schema';
import { CreateSongDto } from '@avans-nx-songlibrary/backend/dto';
import { SongService } from '../song/song.service';


const httpOptions = {
    observe: 'body',
    responseType: 'json' as const
};

@Injectable()
export class AlbumService {
    TAG = 'AlbumService';
    constructor(@InjectModel(Album.name) private albumModel: Model<Album>, private readonly songService: SongService) {}
        
    
    // async create(createSongDto: CreateSongDto): Promise<Song> {
    //     const createdSong = new this.songModel(createSongDto);
    //     return createdSong.save();
    // }

    async getAll(): Promise<IAlbum[]> {
        return this.albumModel.find().populate('artist').exec();
    }

    async getOne(id: string): Promise<IAlbum> {
        const album = await this.albumModel.findById(id).populate('artist').exec();
        if (!album) {
            throw new NotFoundException(`Album could not be found!`);
        }

        const songs = await this.songService.getAllByAlbum(album.id);
        return { ...album, songs};
    }

}
