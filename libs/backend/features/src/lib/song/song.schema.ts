import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
//import { MealSort, IUserInfo } from '@avans-nx-workshop/shared/api';
import { ISong } from '@avans-nx-songlibrary/api';
import { IsMongoId } from 'class-validator';
import { IArtist, IAlbum } from '@avans-nx-songlibrary/api';
import * as mongoose from 'mongoose';

export type SongDocument = Song & Document;
@Schema()
export class Song implements ISong {
    
    @IsMongoId()
    _id!: string;

    @Prop({ required: false})
    image!: string;

    @Prop({ required: true })
    title!: string;

    @Prop({ required: true })
    duration!: number;

    @Prop({ required: true })
    songText!: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Artist' })
    artist!: IArtist;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Album' })
    album!: IAlbum;
}

export const SongSchema = SchemaFactory.createForClass(Song);
