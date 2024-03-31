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
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dtos/update-song-dto';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  async createSong(@Body() createSongDto: CreateSongDTO): Promise<Song> {
    return await this.songsService.create(createSongDto);
  }

  @Get()
  async getSongs(): Promise<Song[]> {
    return await this.songsService.findAll();
  }

  @Get(':id')
  async getSong(@Param('id') id: string): Promise<Song> {
    return await this.songsService.findOne(id);
  }

  @Put(':id')
  async updateSong(
    @Param('id') id: string,
    @Body() updateSongDto: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return await this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  async deleteSong(@Param('id') id: string): Promise<DeleteResult> {
    return await this.songsService.remove(id);
  }
}
