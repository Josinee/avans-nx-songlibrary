import { Id } from './id.type';
import { IArtist } from './artist.interface';

export interface IAlbum {
    id: Id,
    title: string,
    length: number,
    yearOfRelease: number,
    numberOfSongs: number,
    artist: IArtist
}

export type ICreateAlbum = Partial<Omit<IAlbum, 'id'>>;
export type IUpdateAlbum = Partial<Omit<IAlbum, 'id'>>;
export type IUpsertAlbum = IAlbum;