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
    _id!: string;
    
    @Prop({ required: true })
    name!: string;
    
    @Prop({ required: false })
    description!: string;
    
    @Prop({ required: true })
    duration!: number;

    @Prop({ required: true })
    numberOfSongs!: number;
    
    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'ISong' })
    songs!: ISong[];
    
    // @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'IUserInfo' })
    // creator!: IUserInfo;
    
    @Prop({ required: true })
    creationDate!: Date;

    @Prop({ required: true })
    lastUpdated!: Date;

}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
