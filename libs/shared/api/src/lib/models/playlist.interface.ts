import { Id } from './id.type';
import { ISong } from './song.interface';
import { IUserInfo } from './user.interface';

export interface IPlaylist {
    _id: Id,
    name: string,
    description: string,
    duration: number,
    numberOfSongs: number,
    songs: ISong[],
    creator: IUserInfo,
    creationDate: Date,
    lastUpdated: Date,
}

export type ICreatePlaylist = Pick<IPlaylist,'name' | 'numberOfSongs' | 'duration' | 'creationDate' | 'lastUpdated' | 'creator'> & { description?: IPlaylist['description']};
export type IUpdatePlaylist = Partial<Omit<IPlaylist, '_id' | 'creationDate'>>;
export type IUpsertPlaylist = IPlaylist;
