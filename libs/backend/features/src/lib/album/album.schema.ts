import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IsMongoId } from 'class-validator';
import { IArtist, IAlbum, ISong, Genres } from '@avans-nx-songlibrary/api';
import * as mongoose from 'mongoose';

export type AlbumDocument = Album & Document;
@Schema()
export class Album implements IAlbum {

    @IsMongoId()
    _id!: string;
    
    @Prop({ required: true })
    title!: string;

    @Prop({ required: false })
    image!: string;

    @Prop({ required: true })
    duration!: number;

    @Prop({ required: true })
    dateOfRelease!: Date;

    @Prop({ required: true })
    numberOfSongs!: number;

    @Prop({ required: true, enum: Genres, type: String})
    genre!: Genres;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Artist' })
    artist!: IArtist;

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: "Song"})
    songs!: ISong[]

}

export const AlbumSchema = SchemaFactory.createForClass(Album);
