import {
    IsNotEmpty,
    IsString,
} from 'class-validator';
import {
    ICreateArtist,
    IUpdateArtist,
    IUpsertArtist,

} from '@avans-nx-songlibrary/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
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
    id!: string;
    
    
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;


}


