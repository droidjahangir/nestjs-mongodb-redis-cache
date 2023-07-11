// update main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const logger = new Logger();
  const configService = app.get(ConfigService);

  // Swagger configuration
  const options = new DocumentBuilder()
    .setTitle('MERN Stack & Beyond')
    .setVersion('1.0')
    .build();


  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = configService.get('PORT') || 3000;
  console.log('port =======> ', configService.get('MONGO_URL'))
  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

bootstrap();