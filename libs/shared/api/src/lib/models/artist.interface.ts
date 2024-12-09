import { Id } from './id.type';
import { ISong } from './song.interface';
import { Genres, IAlbum } from './album.interface';

export interface IArtist {
    _id: Id,
    image: string,
    name: string,
    description: string,
    recordLabel: string,
    genres: Genres[]
}

export type ICreateArtist = Partial<Omit<IArtist, '_id'>>;;
export type IUpdateArtist = Partial<Omit<IArtist, '_id'>>;
export type IUpsertArtist = IArtist;