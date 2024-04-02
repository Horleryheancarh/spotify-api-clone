import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/user.service';
import { LoginDTO } from './dtos/login-dto';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from '../artists/artist.service';
import { PayloadType } from 'src/types/payload.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private artistService: ArtistService,
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
    const payload: PayloadType = { email: user.email, userId: user.id };

    const artist = await this.artistService.findArtistByUserId(user.id);
    if (artist) payload.artistId = artist.id;

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
