import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongModule } from '@avans-nx-songlibrary/backend/features'
import { PlaylistModule } from '@avans-nx-songlibrary/backend/features'
import { ArtistModule } from '@avans-nx-songlibrary/backend/features'
import { AlbumModule } from '@avans-nx-songlibrary/backend/features'
import { UserModule } from '@avans-nx-songlibrary/backend/features'
import { MongooseModule } from '@nestjs/mongoose';



@Module({
  imports: [SongModule, PlaylistModule, ArtistModule, AlbumModule, UserModule, MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_STRING)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
