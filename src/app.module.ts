import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './api/songs/songs.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { PlayListModule } from './api/playlists/playlist.module';
import { UserModule } from './api/users/user.module';
import { AuthModule } from './api/auth/auth.module';
import { ArtistModule } from './api/artists/artist.module';
import { typeOrmAsyncConfig } from './db/data-source';
import { SeedModule } from './api/seed/seed.module';
import config from './config';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env.prod'],
      isGlobal: true,
      load: [config],
      validate: validate,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AuthModule,
    UserModule,
    ArtistModule,
    SongsModule,
    PlayListModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private datasource: DataSource) {
    console.log('db', this.datasource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs');
  }
}
