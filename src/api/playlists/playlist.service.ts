import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './playlist.entity';
import { Song } from '../songs/song.entity';
import { User } from '../users/user.entity';
import { CreatePlayListDTO } from './dtos/create-playlist-dto';

@Injectable()
export class PlayListService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(playListDto: CreatePlayListDTO): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = playListDto.name;

    const songs = await this.songRepository.findByIds(playListDto.songs);
    playlist.songs = songs;

    const user = await this.userRepository.findOneBy({ id: playListDto.user });
    playlist.user = user;

    return await this.playlistRepository.save(playlist);
  }
}
