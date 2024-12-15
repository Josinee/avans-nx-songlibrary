import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { AlbumType, Genres, IArtist, ICreateAlbum, IUpdateAlbum, IUpsertAlbum } from '@avans-nx-songlibrary/api';

export class CreateAlbumDto implements ICreateAlbum {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsNumber()
    @IsNotEmpty()
    duration!: number;

    @IsNumber()
    @IsNotEmpty()
    dateOfRelease!: Date;

    @IsNumber()
    @IsNotEmpty()
    numberOfSongs!: number;

    @IsNumber()
    @IsNotEmpty()
    artist!: IArtist;
}

export class UpdateAlbumDto implements IUpdateAlbum {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsNumber()
    @IsNotEmpty()
    duration!: number;

    @IsNumber()
    @IsNotEmpty()
    dateOfRelease!: Date;

    @IsNumber()
    @IsNotEmpty()
    numberOfSongs!: number;

    @IsNumber()
    @IsNotEmpty()
    artist!: IArtist;
}

export class UpsertAlbumDto implements IUpsertAlbum {

    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsNumber()
    @IsNotEmpty()
    duration!: number;

    @IsNumber()
    @IsNotEmpty()
    dateOfRelease!: Date;

    @IsNumber()
    @IsNotEmpty()
    numberOfSongs!: number;

    @IsNumber()
    @IsNotEmpty()
    artist!: IArtist;

    @IsString()
    @IsNotEmpty()
    image!: string;

    @IsEnum(Genres)
    @IsNotEmpty()
    genre!: Genres;

    @IsEnum(AlbumType)
    @IsNotEmpty()
    type!: AlbumType;
}
