import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ValidateTokenDTO {
  @ApiProperty({
    example: '',
    description: 'token',
  })
  @IsString()
  token: string;
}
