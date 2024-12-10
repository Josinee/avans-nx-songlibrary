import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistController } from './playlist/playlist.controller';
import { PlaylistService } from './playlist/playlist.service';
import { Playlist, PlaylistSchema } from './playlist/playlist.schema';
import { AuthGuard } from '@avans-nx-songlibrary/backend/auth';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user.module';
import { User } from './user/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Playlist.name, schema: PlaylistSchema }]), JwtModule.register({ secret: process.env['JWT_SECRET'] || 'secretstring', signOptions: { expiresIn: '12 days' } })],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
