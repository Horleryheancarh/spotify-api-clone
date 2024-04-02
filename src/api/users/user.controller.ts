import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() request) {
    return request.user;
  }
}
