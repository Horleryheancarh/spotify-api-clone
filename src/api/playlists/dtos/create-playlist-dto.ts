import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Song } from 'src/api/songs/song.entity';

export class CreatePlayListDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs: Song[];

  @IsNotEmpty()
  @IsNumber()
  readonly user: number;
}
