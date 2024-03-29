import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  createSong() {
    return this.songsService.create('Animals by Martin Garrix');
  }

  @Get()
  getSongs() {
    return this.songsService.findAll();
  }

  @Get(':id')
  getSong(): string {
    return 'Find song based on the id';
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
