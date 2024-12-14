import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
//import { MealSort, IUserInfo } from '@avans-nx-workshop/shared/api';
import { IPlaylist, ISong, IUserInfo } from '@avans-nx-songlibrary/api';
import { IsMongoId } from 'class-validator';
import * as mongoose from 'mongoose';

export type PlaylistDocument = Playlist & Document;
@Schema()
export class Playlist implements IPlaylist {

    

    @IsMongoId()
    _id!: string;
    
    @Prop({ required: true })
    name!: string;
    
    @Prop({ required: false })
    description!: string;
    
    @Prop({ required: true })
    duration: number = 0;

    @Prop({ required: true })
    numberOfSongs: number = 0;
    
    @Prop({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song'}] })
    songs!: ISong[];

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    creator!: IUserInfo;
    
    @Prop({ required: true })
    creationDate!: Date;

    @Prop({ required: true })
    lastUpdated!: Date;

    @Prop({ required: true})
    public: boolean = false;

    @Prop({ required: true})
    image!: string;

}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
