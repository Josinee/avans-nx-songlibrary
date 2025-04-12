import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IPlaylist } from '@avans-nx-songlibrary/api';
import { Playlist } from './playlist.schema';
import { CreatePlaylistDto, UpdatePlaylistDto } from '@avans-nx-songlibrary/backend/dto';


@Injectable()
export class PlaylistService {
    TAG = 'PlaylistService';
    constructor(@InjectModel(Playlist.name) private playlistModel: Model<Playlist>) {}

    async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
        const createdPlaylist = new this.playlistModel(createPlaylistDto);
        return createdPlaylist.save();
    } 

    async getAll(): Promise<IPlaylist[]> {
        return this.playlistModel.find({ public: true }).exec();
    }

    async getOne(id: string): Promise<IPlaylist> {
        const playlist = await this.playlistModel
            .findById(id)
            .populate({
                path: 'songs',
                select: '_id title duration',
                populate: [
                    { path: 'artist', select: '_id name' },
                    { path: 'album', select: '_id title' }
                ]
            })
            .exec();
        if (!playlist) {
            throw new NotFoundException(`Playlist could not be found!`);
        }
        return playlist as IPlaylist;
    }

    async getFromCreator(creator: string): Promise<IPlaylist[]> {
        const playlists = await this.playlistModel.find({ creator: creator }).exec();
        return playlists || [];
    }

    async update(id: string, updatePlaylistDto: UpdatePlaylistDto): Promise<Playlist> {
        console.log('Received update for playlist:', id, 'with data:', updatePlaylistDto);
        const updateData: any = {};

        updatePlaylistDto.name && (updateData.name = updatePlaylistDto.name);
        updatePlaylistDto.description !== undefined && (updateData.description = updatePlaylistDto.description === '' ? null : updatePlaylistDto.description);
        updatePlaylistDto.duration && (updateData.duration = updatePlaylistDto.duration);
        updatePlaylistDto.lastUpdated && (updateData.lastUpdated = updatePlaylistDto.lastUpdated);
        updatePlaylistDto.numberOfSongs && (updateData.numberOfSongs = updatePlaylistDto.numberOfSongs);
        updatePlaylistDto.image !== undefined && (updateData.image = updatePlaylistDto.image === '' ? null : updatePlaylistDto.image);
        if (typeof updatePlaylistDto.public === 'boolean') {
            updateData.public = updatePlaylistDto.public;
        }
        updatePlaylistDto.songs && (updateData.songs = updatePlaylistDto.songs);

        const playlist = await this.playlistModel.findByIdAndUpdate(id, updateData, { new: true }).populate({
            path: 'songs',
            select: '_id title duration',
            populate: [
                { path: 'artist', select: '_id name' },
                { path: 'album', select: '_id title' }
            ]
        }).exec();
        if (!playlist) {
            throw new NotFoundException(`Playlist ${id} not found`);
        }
        return playlist;
    }

    async delete(id: string): Promise<void> {
        const filter = { _id: id };
        const deleted = await this.playlistModel.deleteOne(filter);

    }
}
