import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IAlbum } from '@avans-nx-songlibrary/api';
import { Album } from './album.schema';
import { SongService } from '../song/song.service';
import { CreateAlbumDto, UpdateAlbumDto } from '@avans-nx-songlibrary/backend/dto';

const httpOptions = {
    observe: 'body',
    responseType: 'json' as const
};

@Injectable()
export class AlbumService {
    TAG = 'AlbumService';
    constructor(@InjectModel(Album.name) private albumModel: Model<Album>, private readonly songService: SongService) {}

    async getAll(filters: { dateOfRelease?: string, artist?: string }): Promise<IAlbum[]> {
        console.log('Service filters:', filters);
      
        const query: Record<string, any> = {};
        if (filters.dateOfRelease) {
          const dateOfRelease = new Date(filters.dateOfRelease);
          if (!isNaN(dateOfRelease.getTime())) {
            query['dateOfRelease'] = { $gte: dateOfRelease };
          }
        }
       
        if (filters.artist) {
          query['artist'] = filters.artist;
        }
      
        return this.albumModel
          .find(query).sort({dateOfRelease: -1})
          .populate('artist')
          .exec();
      }

    async getOne(id: string): Promise<any> {
        const album = await this.albumModel.findById(id).populate('artist').exec();
        if (!album) {
            throw new NotFoundException(`Album could not be found!`);
        }
        const songs = await this.songService.getAllByAlbum(id);

        return { ...album.toObject(), songs };
    }

    async create(createAlbum: CreateAlbumDto): Promise<Album> {
        const createdAlbum = new this.albumModel(createAlbum);
        return createdAlbum.save();
    }

    async update(id: string, updateAlbum: UpdateAlbumDto): Promise<Album> {
      const album = await this.albumModel.findById(id);
      if (!album) {
        throw new Error('Album niet gevonden');
      }

      Object.assign(album, updateAlbum);
      return album.save();
    }



  async delete(id: string): Promise<void> {
      const filter = { _id: id };
      const deleted = await this.albumModel.deleteOne(filter);

  }

   
}
