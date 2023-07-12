import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DemoModule } from './demo/demo.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URL'),
      }),
    }),
    DemoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
