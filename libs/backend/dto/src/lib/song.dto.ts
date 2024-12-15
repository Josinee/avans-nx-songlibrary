import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsNumber,
    IsObject,
    IsEnum
} from 'class-validator';
import {
    Genres,
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
export class CreateSongDto implements ICreateSong {

    
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
    artist!: IArtist;

    @IsNotEmpty()
    @IsEnum(Genres)
    genre!: Genres;

}

export class UpdateSongDto implements IUpdateSong {
    @IsString()
    @IsOptional()
    image!: string;
    
    @IsString()
    @IsOptional()
    title!: string;

    @IsNumber()
    @IsOptional()
    duration!: number;

    @IsString()
    @IsOptional()
    songText!: string;

    @IsNumber()
    @IsOptional()
    dateOfRelease!: Date

    @IsOptional()
    @IsObject()
    artist!: IArtist

    @IsOptional()
    @IsObject()
    album!: IAlbum
}

export class UpsertSongDto implements IUpsertSong {


    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsOptional()
    image!: string;

    @IsString()
    @IsNotEmpty()
    title!: string;
    
    @IsNumber()
    @IsNotEmpty()
    duration!: number;

    @IsString()
    @IsOptional()
    songText!: string;

    @IsNumber()
    @IsNotEmpty()
    dateOfRelease!: Date;

    @IsNotEmpty()
    @IsObject()
    artist!: IArtist

    @IsOptional()
    @IsObject()
    album!: IAlbum

    @IsOptional()
    @IsEnum(Genres)
    genre!: Genres;


}


