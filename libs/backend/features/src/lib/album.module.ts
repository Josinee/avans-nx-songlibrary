import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumController } from './album/album.controller';
import { AlbumService } from './album/album.service';
import { Album, AlbumSchema } from './album/album.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }])],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
