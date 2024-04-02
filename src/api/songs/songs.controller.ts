import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dtos/create-song-dto';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dtos/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtArtistGuard } from '../auth/jwt-artist.guard';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  @UseGuards(JwtArtistGuard)
  async createSong(@Body() createSongDto: CreateSongDTO): Promise<Song> {
    return await this.songsService.create(createSongDto);
  }

  @Get()
  async getSongs(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return await this.songsService.paginate({ page, limit });
  }

  @Get(':id')
  async getSong(@Param('id', ParseIntPipe) id: number): Promise<Song> {
    return await this.songsService.findOne(id);
  }

  @Put(':id')
  async updateSong(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return await this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  async deleteSong(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.songsService.remove(id);
  }
}
