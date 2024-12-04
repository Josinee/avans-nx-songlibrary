import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IsMongoId } from 'class-validator';
import { IArtist, IAlbum, ISong } from '@avans-nx-songlibrary/api';

export type ArtistDocument = Artist & Document;
@Schema()
export class Artist implements IArtist {
    @IsMongoId()
    id!: string;

    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    description!: string;

}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
