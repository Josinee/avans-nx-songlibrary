import { Id } from './id.type';
import { IArtist } from './artist.interface';
import { ISong } from './song.interface';

export interface IAlbum {
    id: Id,
    title: string,
    length: number,
    yearOfRelease: number,
    numberOfSongs: number,
    artist: IArtist
    songs?: ISong[]
}

export type ICreateAlbum = Partial<Omit<IAlbum, 'id' | 'songs'>>;
export type IUpdateAlbum = Partial<Omit<IAlbum, 'id' | 'songs'>>;
export type IUpsertAlbum = Partial<Omit<IAlbum, 'songs'>>;