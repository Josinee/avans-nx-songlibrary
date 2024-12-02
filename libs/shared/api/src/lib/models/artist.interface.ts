import { Id } from './id.type';
import { ISong } from './song.interface';
import { IAlbum } from './album.interface';

export interface IArtist {
    id: Id
    name: string,
    description: string,
    songs?: ISong[],
    albums?: IAlbum[]
}
