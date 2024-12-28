import { Id } from './id.type';
import { IArtist } from './artist.interface';
import { ISong } from './song.interface';

export enum Genres {
    Blues = 'Blues',
    Classical = 'Classical',
    Country = 'Country',
    EasyListening = 'Easy Listening',
    Electronic = "Electronic",
    Folk = "Folk",
    HipHopRap = "Hiphop / Rap",
    Jazz = "Jazz",
    Latin = "Latin",
    Pop ="Pop",
    RBSoul = "R&B / Soul",
    Reggae = "Reggae",
    Rock = "Rock"
}

export enum AlbumType {
    Single = "Single",
    EP = "EP",
    Album = "Album",
    Compilation = "Compilation Album",
    Soundtrack = "Soundtrack",
    Deluxe = "Deluxe Edition"
}

export interface IAlbum {
    _id: Id,
    title: string,
    image: string,
    duration: number,
    dateOfRelease: Date,
    numberOfSongs: number,
    genre: Genres[],
    artist: IArtist,
    songs: ISong[],
    type: AlbumType,
}

export type ICreateAlbum = Partial<Omit<IAlbum, 'id' | 'songs'>>;
export type IUpdateAlbum = Partial<Omit<IAlbum, 'id' | 'songs'>>;
export type IUpsertAlbum = Partial<Omit<IAlbum, 'songs'>>;