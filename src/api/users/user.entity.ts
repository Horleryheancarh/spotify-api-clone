import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Playlist } from '../playlists/playlist.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({
    example: 5,
    description: 'user id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Jane',
    description: 'firstName of user',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'lastName of user',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'janedoe@gmail.com',
    description: 'user mail',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'password of user',
  })
  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Playlist, (playList) => playList.user)
  playLists: Playlist[];

  @Column({ nullable: true, type: 'text' })
  twoFASecret: string;

  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;

  @Column({
    default: null,
  })
  apiKey: string;

  @Column()
  phone: string;
}
