import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { User } from '../users/user.entity';
import { Song } from '../songs/song.entity';
import { PlayListService } from './playlist.service';
import { PlayListsController } from './playlist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
  controllers: [PlayListsController],
  providers: [PlayListService],
})
export class PlayListModule {}
