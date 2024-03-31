import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './api/songs/songs.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './api/songs/song.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      database: 'spotify-clone',
      host: 'localhost',
      port: 27017,
      username: '',
      password: '',
      entities: [Song],
      synchronize: true,
    }),
    SongsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private datasource: DataSource) {
    console.log('db', this.datasource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // Option 1
    consumer.apply(LoggerMiddleware).forRoutes('songs');
    // Option 2
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST });
    // Option 3
    // consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
