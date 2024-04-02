import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/user.service';
import { LoginDTO } from './dtos/login-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDTO): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(loginDto.email);
    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatch)
      throw new UnauthorizedException('Invalid Login Details');

    delete user.password;
    return {
      access_token: this.jwtService.sign({ email: user.email, id: user.id }),
    };
  }
}
