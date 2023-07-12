// update demo.service.ts
import { Injectable } from '@nestjs/common';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Demo } from './schemas/demo.schema';
import Redis from 'ioredis'
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class DemoService {
  private readonly redis: Redis;
  constructor(
    @InjectModel(Demo.name) private demoModel: Model<Demo>,
    private readonly redisService: RedisService
  ) {
    this.redis = this.redisService.getClient();
  }
  async create(createDemoDto: CreateDemoDto): Promise<Demo> {
    const createdDemo = new this.demoModel(createDemoDto);
    return createdDemo.save();
  }

  async findAll(): Promise<object> {
    try {
      const cachedData= await this.redis.get('demo_data');
      console.log({cachedData});
      if (cachedData) {
        return {  cachedData, fromCache: true };
      }

      const data = await this.demoModel.find({}, { _id: 1, name: 1, age: 1, gender: 1, email: 1 }).exec();

      const cacheData = await this.redis.set('demo_data', JSON.stringify(data))
      console.log('cache data ====> ', JSON.stringify(cacheData))
      
      // Set fromCache to false for newly fetched data
      return { data, fromCache: false };
    } catch (e) {
      console.log(e);
    }

  }

  findOne(id: number) {
    return `This action return a #${id} demo`;
  }

  update(id: number, updateDemoDto: UpdateDemoDto) {
    return `This action updates a #${id} demo`;
  }

  remove(id: number) {
    return `This action removes a #${id} demo`;
  }
}