import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UpdateResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as speakeasy from 'speakeasy';

import { UsersService } from '../users/user.service';
import { LoginDTO } from './dtos/login-dto';
import { ArtistService } from '../artists/artist.service';
import { PayloadType } from 'src/types/payload.type';
import { Enable2FAType } from 'src/types/enable2fa.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private artistService: ArtistService,
    private configService: ConfigService,
  ) {}

  async login(
    loginDto: LoginDTO,
  ): Promise<
    { access_token: string } | { validate2FA: string; message: string }
  > {
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

    if (user.enable2FA)
      return {
        validate2FA: '/auth/validate-2fa',
        message: 'Validate your OTP from authenitcaor app',
      };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async enable2FA(userId: number): Promise<Enable2FAType> {
    const user = await this.userService.findById(userId);

    if (user.enable2FA) {
      return { secret: user.twoFASecret };
    }

    const secret = speakeasy.generateSecret();
    user.twoFASecret = secret.base32;

    await this.userService.updateSecretKey(user.id, user.twoFASecret);
    return { secret: user.twoFASecret };
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return await this.userService.disable2FA(userId);
  }

  async validate2FAToken(
    userId: number,
    token: string,
  ): Promise<{ verified: boolean }> {
    const user = await this.userService.findById(userId);

    const verified = speakeasy.totp.verify({
      secret: user.twoFASecret,
      token,
      encoding: 'base32',
    });

    return { verified };
  }

  async validateUserByApiKey(apiKey: string) {
    return this.userService.findByApiKey(apiKey);
  }

  getEnvVariable() {
    return this.configService.get<number>('PORT');
  }
}
