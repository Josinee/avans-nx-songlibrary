import { Id } from './id.type';
import { ISong } from './song.interface';
import { IAlbum } from './album.interface';

export interface IArtist {
    id: Id
    name: string,
    description: string
}

export type ICreateArtist = Partial<Omit<IArtist, 'id'>>;;
export type IUpdateArtist = Partial<Omit<IArtist, 'id'>>;
export type IUpsertArtist = IArtist;