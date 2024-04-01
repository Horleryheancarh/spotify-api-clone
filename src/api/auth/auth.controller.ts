import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { User } from '../users/user.entity';
import { CreateUserDTO } from '../users/dtos/create-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  async signup(@Body() userDto: CreateUserDTO): Promise<User> {
    return await this.userService.create(userDto);
  }
}
