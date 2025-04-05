import { Id } from './id.type';
import { IArtist } from './artist.interface';
import { Genres, IAlbum } from './album.interface';

export interface ISong {
    _id: Id,
    title: string,
    duration: number,
    songText: string,
    artist: IArtist,
    album: IAlbum,
    genre: Genres
}


export type ICreateSong = Pick<ISong, 'title' | 'duration' | 'artist' | 'songText'> & {genre?: Genres; album?: IAlbum;}
export type IUpdateSong = Partial<Omit<ISong, '_id'>>;
export type IUpsertSong = ISong;
