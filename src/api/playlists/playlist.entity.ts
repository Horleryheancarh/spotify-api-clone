import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Song } from '../songs/song.entity';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('playlists')
export class Playlist {
  @ApiProperty({
    example: 2,
    description: 'playlist id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'AfroHits',
    description: 'playlist name',
  })
  @Column()
  name: string;

  @OneToMany(() => Song, (song) => song.playList)
  songs: Song[];

  @ManyToOne(() => User, (user) => user.playLists)
  user: User;
}
