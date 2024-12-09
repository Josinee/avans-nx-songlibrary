import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumController } from './album/album.controller';
import { AlbumService } from './album/album.service';
import { Album, AlbumSchema } from './album/album.schema';
import { Song, SongSchema } from './song/song.schema';
import { SongService } from './song/song.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }, { name: Song.name, schema: SongSchema}])],
  controllers: [AlbumController],
  providers: [AlbumService, SongService],
  exports: [AlbumService],
})
export class AlbumModule {}
