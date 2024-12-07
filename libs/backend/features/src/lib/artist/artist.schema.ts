import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IsMongoId } from 'class-validator';
import { IArtist, IAlbum, ISong, Genres } from '@avans-nx-songlibrary/api';

export type ArtistDocument = Artist & Document;
@Schema()
export class Artist implements IArtist {
    @IsMongoId()
    _id!: string;

    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    description!: string;

    @Prop({ required: false})
    recordLabel!: string;

    @Prop({ required: false})
    genres!: Genres[];

}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
