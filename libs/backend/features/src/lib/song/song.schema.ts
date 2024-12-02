import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
//import { MealSort, IUserInfo } from '@avans-nx-workshop/shared/api';
import { ISong } from '@avans-nx-songlibrary/api';
import { IsMongoId } from 'class-validator';
import { IArtist, IAlbum } from '@avans-nx-songlibrary/api';

export type SongDocument = Song & Document;
@Schema()
export class Song implements ISong {
    @IsMongoId()
    id!: string;

    @Prop({ required: true })
    title!: string;

    @Prop({ required: true })
    length!: number;

    @Prop({ required: true })
    songText!: string;

    @Prop({ required: true })
    yearOfRelease!: number;

    @Prop({ required: true, type: Object })
    artist!: IArtist;

    @Prop({ required: true, type: Object })//TODO mongoose object
    album?: IAlbum;
}

export const SongSchema = SchemaFactory.createForClass(Song);
