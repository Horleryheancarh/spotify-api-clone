import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../artists/artist.entity';
import { Playlist } from '../playlists/playlist.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('songs')
export class Song {
  @ApiProperty({
    example: 6,
    description: 'user id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Radioactive',
    description: 'song title',
  })
  @Column()
  title: string;

  @ApiProperty({
    example: '2024-10-10',
    description: 'release date',
  })
  @Column({ type: 'date' })
  releasedDate: Date;

  @ApiProperty({
    example: '3:51',
    description: 'duration',
  })
  @Column({ type: 'time' })
  duration: Date;

  @ApiProperty({
    example: 'lorem ',
    description: 'release date',
  })
  @Column({ type: 'text', nullable: true })
  lyrics: string;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];

  @ManyToOne(() => Playlist, (playList) => playList.songs)
  playList: Playlist;
}
