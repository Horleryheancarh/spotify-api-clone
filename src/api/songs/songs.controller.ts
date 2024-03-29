import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('songs')
export class SongsController {
  constructor() {}

  @Post()
  createSong(): string {
    return 'Create new song';
  }

  @Get()
  getSongs(): string {
    return 'Find all songs';
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
