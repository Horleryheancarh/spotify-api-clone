import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('varchar', { array: true })
  artists: string[];

  @Column({ type: 'date' })
  releasedDate: Date;

  @Column({ type: 'time' })
  duration: Date;

  @Column({ type: 'text', nullable: true })
  lyrics: string;

  // @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  // @JoinTable({ name: 'songs_artists' })
  // artists: Artist[];

  // /**
  //  * Many songs can belong to a playlist
  //  */
  // @ManyToOne(() => Playlist, (playList) => playList.songs)
  // playList: Playlist;
}
