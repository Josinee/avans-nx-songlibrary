import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsNumber,
    IsObject
} from 'class-validator';
import {
    IAlbum,
    IArtist,
    ICreateSong,
    IUpdateSong,
    IUpsertSong,

} from '@avans-nx-songlibrary/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateArtistDto implements ICreateArtist {
    @IsString()
    @IsNotEmpty()
    title!: string;
    
    @IsNumber()
    @IsNotEmpty()
    length!: number;


    @IsNumber()
    @IsNotEmpty()
    yearOfRelease!: number;

    @IsNumber()
    @IsNotEmpty()
    artist!: IArtist;

}

export class UpdateArtistDto implements IUpdateArtist {
    @IsString()
    @IsOptional()
    image!: string;
    
    @IsString()
    @IsOptional()
    title!: string;

    @IsNumber()
    @IsOptional()
    length!: number;

    @IsString()
    @IsOptional()
    songText!: string;

    @IsNumber()
    @IsOptional()
    yearOfRelease!: number

    @IsOptional()
    @IsObject()
    artist!: IArtist

    @IsOptional()
    @IsObject()
    album!: IAlbum
}

export class UpsertArtistDto implements IUpsertArtist {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsOptional()
    image!: string;

    @IsString()
    @IsNotEmpty()
    title!: string;
    
    @IsNumber()
    @IsNotEmpty()
    length!: number;

    @IsString()
    @IsOptional()
    songText!: string;

    @IsNumber()
    @IsNotEmpty()
    yearOfRelease!: number;

    @IsNotEmpty()
    @IsObject()
    artist!: IArtist

    @IsOptional()
    @IsObject()
    album!: IAlbum


}


