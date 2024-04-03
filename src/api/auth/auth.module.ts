import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/config';
import { JwtStrategy } from './jwt.strategy';
import { ArtistModule } from '../artists/artist.module';
import { ApiKeyStrategy } from './ApiKeyStrategy';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ApiKeyStrategy],
  exports: [AuthService],
})
export class AuthModule {}
