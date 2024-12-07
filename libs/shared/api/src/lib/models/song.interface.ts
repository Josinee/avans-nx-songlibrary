import { Id } from './id.type';
import { IArtist } from './artist.interface';
import { IAlbum } from './album.interface';

export interface ISong {
    _id: Id,
    image: string,
    title: string,
    duration: number,
    songText: string,
    dateOfRelease: Date
    artist: IArtist,
    album?: IAlbum,

}


export type ICreateSong = Pick<ISong,'title' | 'duration' | 'dateOfRelease' | 'artist'>;
export type IUpdateSong = Partial<Omit<ISong, '_id'>>;
export type IUpsertSong = ISong;
