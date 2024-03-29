import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';

@Module({
  imports: [],
  controllers: [SongsController],
  providers: [],
})
export class SongsModule {}
