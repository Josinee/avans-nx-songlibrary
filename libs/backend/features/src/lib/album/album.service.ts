import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IAlbum } from '@avans-nx-songlibrary/api';
import { Album } from './album.schema';
import { SongService } from '../song/song.service';

const httpOptions = {
    observe: 'body',
    responseType: 'json' as const
};

@Injectable()
export class AlbumService {
    TAG = 'AlbumService';
    constructor(@InjectModel(Album.name) private albumModel: Model<Album>, private readonly songService: SongService) {}

    async getAll(dateOfReleaseFilter?: string): Promise<IAlbum[]> {
        if (dateOfReleaseFilter) {
            const filterDate = new Date(dateOfReleaseFilter);

            if (isNaN(filterDate.getTime())) {
                throw new Error('Invalid date format');
            }

            return this.albumModel
                .find({
                    dateOfRelease: { $gte: filterDate }
                })
                .populate('artist')
                .exec();
        }

        return this.albumModel.find().populate('artist').exec();
    }

    async getOne(id: string): Promise<IAlbum> {
        const album = await this.albumModel.findById(id).populate('artist').exec();
        if (!album) {
            throw new NotFoundException(`Album could not be found!`);
        }

        return album;
        
    }
}
