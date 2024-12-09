import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongModule } from '@avans-nx-songlibrary/backend/features'
import { PlaylistModule } from '@avans-nx-songlibrary/backend/features'
import { ArtistModule } from '@avans-nx-songlibrary/backend/features'
import { AlbumModule } from '@avans-nx-songlibrary/backend/features'
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [SongModule, PlaylistModule, ArtistModule, AlbumModule, MongooseModule.forRoot('mongodb://localhost:27017/songlibrary')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
