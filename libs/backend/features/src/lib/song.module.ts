import { Module } from '@nestjs/common';
import { SongController } from './song/song.controller';
import { SongService } from './song/song.service';

@Module({
  controllers: [SongController],
  providers: [SongService],
  exports: [SongService],
})
export class SongModule {}
