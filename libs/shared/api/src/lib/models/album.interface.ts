import { Id } from './id.type';
import { ISong } from './song.interface';
import { IArtist } from './artist.interface';

export interface IAlbum {
    id: Id,
    title: string,
    length: number,
    yearOfRelease: number,
    numberOfSongs: number,
    songs: ISong[],
    artist: IArtist
}
