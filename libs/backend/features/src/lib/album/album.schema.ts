import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IsMongoId } from 'class-validator';
import { IArtist, IAlbum } from '@avans-nx-songlibrary/api';
import * as mongoose from 'mongoose';

export type AlbumDocument = Album & Document;
@Schema()
export class Album implements IAlbum {
    @IsMongoId()
    id!: string;
    
    @Prop({ required: true })
    title!: string;

    @Prop({ required: true })
    length!: number;

    @Prop({ required: true })
    yearOfRelease!: number;

    @Prop({ required: true })
    numberOfSongs!: number;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Artist' })
    artist!: IArtist;

}

export const AlbumSchema = SchemaFactory.createForClass(Album);
