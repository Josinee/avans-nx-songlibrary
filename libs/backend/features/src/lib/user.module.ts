import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';
import { Playlist, PlaylistSchema } from './playlist/playlist.schema';
import { PlaylistService } from './playlist/playlist.service';
// import { Meal, MealSchema } from '@avans-nx-workshop/backend/features';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Playlist.name, schema: PlaylistSchema }])],
    controllers: [UserController],
    providers: [UserService, PlaylistService],
    exports: [UserService]
})
export class UserModule {}
