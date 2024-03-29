import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './api/songs/songs.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
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
