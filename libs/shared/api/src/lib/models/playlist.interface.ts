import { Id } from './id.type';
import { ISong } from './song.interface';
import { IUserInfo } from './user.interface';

export interface IPlaylist {
    id: Id,
    name: string,
    description: string,
    length: number,
    numberOfSongs: number,
    songs: ISong[],
    creator: IUserInfo,
    creationDate: Date
}

export type ICreatePlaylist = Pick<IPlaylist,'name' | 'creator' | 'numberOfSongs' | 'length' | 'creationDate'>;
export type IUpdatePlaylist = Partial<Omit<IPlaylist, 'id' | 'creator' | 'creationDate'>>;
export type IUpsertPlaylist = IPlaylist;
