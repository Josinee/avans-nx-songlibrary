import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { Artist, ArtistSchema } from './artist/artist.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }])],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
