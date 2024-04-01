import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Song } from './song.entity';
import { CreateSongDTO } from './dtos/create-song-dto';
import { UpdateSongDTO } from './dtos/update-song-dto';
import { Artist } from '../artists/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(songDto: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDto.title;
    song.duration = songDto.duration;
    song.lyrics = songDto.lyrics;
    song.releasedDate = songDto.releasedDate;

    const artists = await this.artistsRepository.findByIds(songDto.artists);
    song.artists = artists;

    return await this.songsRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return await this.songsRepository.find();
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songsRepository.findOneBy({ id });

    if (!song) throw new NotFoundException('Song not Found');

    return song;
  }

  async update(id: number, data: UpdateSongDTO): Promise<UpdateResult> {
    const song = await this.songsRepository.findOneBy({ id });

    if (!song) throw new NotFoundException('Song not Found');

    return await this.songsRepository.update(id, { ...data });
  }

  async remove(id: number): Promise<DeleteResult> {
    const song = await this.songsRepository.findOneBy({ id });

    if (!song) throw new NotFoundException('Song not Found');

    return await this.songsRepository.delete(id);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');

    return await paginate<Song>(queryBuilder, options);
  }
}
