import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dtos/create-song-dto';
import { UpdateSongDTO } from './dtos/update-song-dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  async create(songDto: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDto.title;
    song.artists = songDto.artists;
    song.duration = songDto.duration;
    song.lyrics = songDto.lyrics;
    song.releasedDate = songDto.releasedDate;

    return await this.songRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return await this.songRepository.find();
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songRepository.findOneBy({ id });

    if (!song) throw new NotFoundException('Song not Found');

    return song;
  }

  async update(id: number, data: UpdateSongDTO): Promise<UpdateResult> {
    const song = await this.songRepository.findOneBy({ id });

    if (!song) throw new NotFoundException('Song not Found');

    return await this.songRepository.update(id, { ...data });
  }

  async remove(id: number): Promise<DeleteResult> {
    const song = await this.songRepository.findOneBy({ id });

    if (!song) throw new NotFoundException('Song not Found');

    return await this.songRepository.delete(id);
  }
}
