import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsNumber
} from 'class-validator';
import {
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
    length!: number;

    @IsString()
    @IsNotEmpty()
    songText!: string;

    @IsNumber()
    @IsNotEmpty()
    yearOfRelease!: number;



}

export class UpsertSongDto implements IUpsertSong {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    title!: string;
    
    @IsNumber()
    @IsNotEmpty()
    length!: number;

    @IsString()
    @IsNotEmpty()
    songText!: string;

    @IsNumber()
    @IsNotEmpty()
    yearOfRelease!: number;


}

export class UpdateSongDto implements IUpdateSong {
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
}
