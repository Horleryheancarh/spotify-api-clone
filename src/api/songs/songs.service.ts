import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class SongsService {
  // local db
  // local array

  private readonly songs = [];

  create(song) {
    // Save song to db
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    // Fetch songs from db
    if (this.songs.length <= 0) {
      throw new NotFoundException('No Songs Available');
    }
    return this.songs;
  }
}
