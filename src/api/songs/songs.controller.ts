import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dtos/create-song-dto';
import { Song } from './song.entity';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  async createSong(@Body() createSongDto: CreateSongDTO): Promise<Song> {
    return await this.songsService.create(createSongDto);
  }

  @Get()
  async getSongs(): Promise<Song[]> {
    const songs = await this.songsService.findAll();

    for (const song of songs) {
      console.log(`${typeof song.id}`);
    }

    return songs;
  }

  @Get(':id')
  async getSong(@Param('id') id: string): Promise<Song> {
    return await this.songsService.findOne(id);
  }

  @Put(':id')
  updateSong(): string {
    return 'Update song based on the id';
  }

  @Delete(':id')
  deleteSong(): string {
    return 'Delete song based on the id';
  }
}
