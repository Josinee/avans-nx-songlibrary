import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IPlaylist, IUser, UserGender, UserRole } from '@avans-nx-songlibrary/api';
import { IsMongoId } from 'class-validator';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
    @IsMongoId()
    _id!: string;

    @Prop({ required: true, type: String })
    name!: string;

    @Prop({ required: true, select: false, type: String })
    password = '';

    @Prop({ required: true, type: String, select: true, unique: true })
    emailAddress = '';

    @Prop({ required: false, select: true })
    profileImgUrl!: string;

    @Prop({ required: false, type: String, default: UserRole.Guest })
    role: UserRole = UserRole.Guest;

    @Prop({ required: false, type: String, default: UserGender.Unknown })
    gender: UserGender = UserGender.Unknown;

    @Prop({ required: false, type: Boolean, default: true })
    isActive = true;

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' })
    playlists: IPlaylist[] = [];
}

export const UserSchema = SchemaFactory.createForClass(User);
