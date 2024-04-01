import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsOptional,
  IsString,
} from 'class-validator';
import { Artist } from 'src/api/artists/artist.entity';

export class UpdateSongDTO {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsArray()
  @IsOptional()
  readonly artists: Artist[];

  @IsDateString()
  @IsOptional()
  readonly releasedDate: Date;

  @IsMilitaryTime()
  @IsOptional()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
