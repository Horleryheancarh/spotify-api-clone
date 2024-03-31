import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('songs')
export class Song {
  @ObjectIdColumn()
  id: string;

  @Column()
  title: string;

  @Column('varchar', { array: true })
  artists: string[];

  @Column({ type: 'date' })
  releasedDate: Date;

  @Column({ type: 'time' })
  duration: Date;

  @Column('text')
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
