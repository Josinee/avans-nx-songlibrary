import { Id } from './id.type';
import { IArtist } from './artist.interface';
import { IAlbum } from './album.interface';

export interface ISong {
    id: Id,
    title: string,
    length: number,
    songText: string,
    yearOfRelease: number
    artist: IArtist,
    album?: IAlbum,

}


export type ICreateSong = Pick<ISong,'title' | 'length' | 'yearOfRelease' | 'artist'>;
export type IUpdateSong = Partial<Omit<ISong, 'id'>>;
export type IUpsertSong = ISong;
