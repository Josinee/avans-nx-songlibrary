import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsNumber,
    IsObject,
    IsArray,
    IsDate
} from 'class-validator';
import {
    ICreatePlaylist,
    IUpdatePlaylist,
    IUpsertPlaylist,
    ISong,
    Id,
    IUserInfo

} from '@avans-nx-songlibrary/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreatePlaylistDto implements ICreatePlaylist {
   
    @IsString()
    @IsNotEmpty()
    name!: string;
    
    @IsNumber()
    @IsNotEmpty()
    duration!: number;

    @IsNumber()
    @IsNotEmpty()
    numberOfSongs!: number;

    // @IsObject()
    // @IsNotEmpty()
    // creator!: IUserInfo;

    @IsDate()
    @IsNotEmpty()
    creationDate!: Date;

    @IsDate()
    @IsNotEmpty()
    lastUpdated!: Date;

}

export class UpdatePlaylistDto implements IUpdatePlaylist {
    
    @IsString()
    @IsOptional()
    name!: string;

    @IsString()
    @IsOptional()
    description!: string;

    @IsNumber()
    @IsOptional()
    duration!: number;

    @IsNumber()
    @IsOptional()
    numberOfSongs!: number

    @IsOptional()
    @IsArray()
    songs?: ISong[]

    @IsDate()
    @IsNotEmpty()
    lastUpdated!: Date;

}

export class UpsertPlaylistDto implements IUpsertPlaylist {

    @IsString()
    @IsNotEmpty()
    _id!: Id;
    
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;
    
    @IsNumber()
    @IsNotEmpty()
    duration!: number;

    @IsNumber()
    @IsNotEmpty()
    numberOfSongs!: number;

    @IsArray()
    songs!: ISong[]

    @IsObject()
    @IsNotEmpty()
    creator!: IUserInfo;

    @IsDate()
    @IsNotEmpty()
    creationDate!: Date;

    @IsDate()
    @IsNotEmpty()
    lastUpdated!: Date;



}


