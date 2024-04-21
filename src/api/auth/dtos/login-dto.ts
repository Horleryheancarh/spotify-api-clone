import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    example: 'janedoe@gmail.com',
    description: 'user mail',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'janedoe@',
    description: 'user password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
