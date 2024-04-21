import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    example: 'Jane',
    description: 'firstName of user',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'lastName of user',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'janedoe@gmail.com',
    description: 'email of user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'janedoe@',
    description: 'password of user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
