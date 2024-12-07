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
    ICreateAlbum,
    IUpdateAlbum,
    IUpsertAlbum,

} from '@avans-nx-songlibrary/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateAlbumDto implements ICreateAlbum{
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


}


