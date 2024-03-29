import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dtos/create-song-dto';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  createSong(@Body() createSongDto: CreateSongDTO) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  getSongs() {
    return this.songsService.findAll();
  }

  @Get(':id')
  getSong(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): string {
    return `Find song based on the id ${typeof id}`;
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
