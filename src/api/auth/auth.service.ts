import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/user.service';
import { LoginDTO } from './dtos/login-dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async login(loginDto: LoginDTO): Promise<User> {
    const user = await this.userService.findOne(loginDto.email);
    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatch)
      throw new UnauthorizedException('Invalid Login Details');

    delete user.password;
    return user;
  }
}
