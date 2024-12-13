import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IPlaylist, IUser } from '@avans-nx-songlibrary/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { Playlist } from './playlist.schema'
import { Song } from '../song/song.schema'; 
import { CreatePlaylistDto, UpdatePlaylistDto } from '@avans-nx-songlibrary/backend/dto';
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
        console.log('getall in service')
        return this.playlistModel.find({public: true}).exec();
    }

    async getOne(id: string): Promise<IPlaylist> {
        const playlist = await this.playlistModel.findById(id).populate({path: 'songs', select: '_id title duration', populate: [{path: 'artist', select: '_id name'}, {path: 'album', select: '_id title'}]}).exec();
        if (!playlist) {
            throw new NotFoundException(`Playlist could not be found!`);
        }
        return playlist as IPlaylist;
    }

    async getFromCreator(creator: string): Promise<IPlaylist[]> {
        //const creatorObjectId = new Types.ObjectId(creator);
      
        const playlists = await this.playlistModel.find({ creator: creator }).exec();
      
        //console.log('Query result:', playlists); // Debug log
        return playlists || [];
      }

    async update(id: string, updatePlaylistDto: UpdatePlaylistDto): Promise<Playlist> {
        console.log('Received update for playlist:', id, 'with data:', updatePlaylistDto);
        const updateData: any={};

        updatePlaylistDto.name && (updateData.name = updatePlaylistDto.name);
        updatePlaylistDto.description && (updateData.description = updatePlaylistDto.description);
        updatePlaylistDto.duration && (updateData.duration = updatePlaylistDto.duration);
        updatePlaylistDto.lastUpdated && (updateData.lastUpdated = updatePlaylistDto.lastUpdated);
        updatePlaylistDto.numberOfSongs && (updateData.numberOfSongs = updatePlaylistDto.numberOfSongs);
        updatePlaylistDto.lastUpdated && (updateData.lastUpdated = updatePlaylistDto.lastUpdated);
        updatePlaylistDto.songs && (updateData.songs = updatePlaylistDto.songs);

        const playlist = await this.playlistModel.findByIdAndUpdate(id, updateData, {new: true}).exec();
        if (!playlist) {
            throw new NotFoundException(`Playlist ${id} not found`);
        }

        console.log('endboss')
        return playlist;
    }

    async delete(id: string): Promise<void> {
        console.log("delte playlist ", id);
        const filter  = { _id: id };
        const deleted = await this.playlistModel.deleteOne(filter);
        console.log('endboss deleted');
    }

}
