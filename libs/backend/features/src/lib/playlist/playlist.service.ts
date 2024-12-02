import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IPlaylist } from '@avans-nx-songlibrary/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { Playlist } from './playlist.schema'
import { Song } from '../song/song.schema';
import { CreatePlaylistDto } from '@avans-nx-songlibrary/backend/dto';
//import { CreateCatDto } from './dto/create-cat.dto';


const httpOptions = {
    observe: 'body',
    responseType: 'json' as const
};

@Injectable()
export class PlaylistService {
    TAG = 'PlaylistService';
    constructor(@InjectModel(Playlist.name) private playlistModel: Model<Playlist>) {}
        
    
    async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
        const createdPlaylist = new this.playlistModel(createPlaylistDto);
        return createdPlaylist.save();
    }

    async getAll(): Promise<IPlaylist[]> {
        return this.playlistModel.find().exec();
    }

    async getOne(id: string): Promise<IPlaylist> {
        const playlist = await this.playlistModel.findById(id).exec();
        if (!playlist) {
            throw new NotFoundException(`Playlist could not be found!`);
        }
        return playlist as IPlaylist;
    }

}
