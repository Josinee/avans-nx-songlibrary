import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { Genres, ICreateArtist, IUpdateArtist, IUpsertArtist } from '@avans-nx-songlibrary/api';

export class CreateArtistDto implements ICreateArtist {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;
}

export class UpdateArtistDto implements IUpdateArtist {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;
}

export class UpsertArtistDto implements IUpsertArtist {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    image!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    recordLabel!: string;

    @IsArray()
    @IsNotEmpty()
    genres!: Genres[];
}
