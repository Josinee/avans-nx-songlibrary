import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsMongoId } from 'class-validator';
import { IArtist, IAlbum, Genres, AlbumType } from '@avans-nx-songlibrary/api';
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

    @Prop({ required: true })
    genre!: Genres[];

    @Prop({ required: true, enum: AlbumType, type: String })
    type!: AlbumType;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Artist' })
    artist!: IArtist;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
