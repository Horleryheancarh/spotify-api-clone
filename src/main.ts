import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { SeedService } from './api/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // const seedService = app.get(SeedService);
  // await seedService.seed();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Spotify Clone API')
    .setDescription('The Spotify API Clone Documentation')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
