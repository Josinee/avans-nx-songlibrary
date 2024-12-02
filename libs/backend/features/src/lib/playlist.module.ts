import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistController } from './playlist/playlist.controller';
import { PlaylistService } from './playlist/playlist.service';
import { Playlist, PlaylistSchema } from './playlist/playlist.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Playlist.name, schema: PlaylistSchema }])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
