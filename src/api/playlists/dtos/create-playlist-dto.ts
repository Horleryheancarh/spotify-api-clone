import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Song } from 'src/api/songs/song.entity';

export class CreatePlayListDTO {
  @ApiProperty({
    example: 'AfroHits',
    description: 'playlist name',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: [3, 4, 45, 23],
    description: 'songs',
  })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs: Song[];

  @ApiProperty({
    example: 4,
    description: 'user id',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly user: number;
}
