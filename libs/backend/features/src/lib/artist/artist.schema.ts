import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsMongoId } from 'class-validator';
import { IArtist, Genres } from '@avans-nx-songlibrary/api';

export type ArtistDocument = Artist & Document;
@Schema()
export class Artist implements IArtist {
    @IsMongoId()
    _id!: string;

    @Prop({ required: false })
    image!: string;

    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    description!: string;

    @Prop({ required: false })
    recordLabel!: string;

    @Prop({ required: false })
    genres!: Genres[];
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
