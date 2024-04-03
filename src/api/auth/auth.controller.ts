import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { User } from '../users/user.entity';
import { CreateUserDTO } from '../users/dtos/create-user-dto';
import { LoginDTO } from './dtos/login-dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { Enable2FAType } from 'src/types/enable2fa.type';
import { ValidateTokenDTO } from './dtos/validate-token-dto';

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

  @Get('enable-2fa')
  @UseGuards(JwtAuthGuard)
  async enable2FA(@Req() req): Promise<Enable2FAType> {
    return await this.authService.enable2FA(req.user.userId);
  }

  @Post('disable-2fa')
  async disable2fa() {}

  // Validate 2fa
  @Post('validate-2fa')
  @UseGuards(JwtAuthGuard)
  async validate2FA(
    @Req() req,
    @Body() validateTokenDto: ValidateTokenDTO,
  ): Promise<{ verified: boolean }> {
    return await this.authService.validate2FAToken(
      req.user.userId,
      validateTokenDto.token,
    );
  }
}
