import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { User } from '../users/user.entity';
import { CreateUserDTO } from '../users/dtos/create-user-dto';
import { LoginDTO } from './dtos/login-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() userDto: CreateUserDTO): Promise<User> {
    return await this.userService.create(userDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    return await this.authService.login(loginDto);
  }
}
