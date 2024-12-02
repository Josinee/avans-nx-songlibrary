import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
//import { MealSort, IUserInfo } from '@avans-nx-workshop/shared/api';
import { IPlaylist, ISong, IUserInfo } from '@avans-nx-songlibrary/api';
import { IsMongoId } from 'class-validator';
import * as mongoose from 'mongoose';

export type PlaylistDocumentent = Playlist & Document;
@Schema()
export class Playlist implements IPlaylist {

    @IsMongoId()
    id!: string;
    
    
    @Prop({ required: true })
    name!: string;
    
    @Prop({ required: true })
    description!: string;
    
    @Prop({ required: true })
    length!: number;

    @Prop({ required: true })
    numberOfSongs!: number;
    
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'ISong' })
    songs!: ISong[];
    
    @Prop({ required: true })
    creator!: IUserInfo;
    
    @Prop({ required: true })
    creationDate!: Date;

}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
