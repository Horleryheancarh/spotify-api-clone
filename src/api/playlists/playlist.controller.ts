import { Body, Controller, Post } from '@nestjs/common';
import { PlayListService } from './playlist.service';
import { Playlist } from './playlist.entity';
import { CreatePlayListDTO } from './dtos/create-playlist-dto';

@Controller('playlist')
export class PlayListsController {
  constructor(private playListService: PlayListService) {}

  @Post()
  async create(@Body() playlistDto: CreatePlayListDTO): Promise<Playlist> {
    return await this.playListService.create(playlistDto);
  }
}
