import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './api/songs/songs.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './api/songs/song.entity';
import { DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from './config';
import { Artist } from './api/artists/artist.entity';
import { User } from './api/users/user.entity';
import { Playlist } from './api/playlists/playlist.entity';
import { PlayListModule } from './api/playlists/playlist.module';
import { UserModule } from './api/users/user.module';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      entities: [Song, Artist, User, Playlist],
      synchronize: true,
    }),
    PlayListModule,
    SongsModule,
    UserModule,
    AuthModule,
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
