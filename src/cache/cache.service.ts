// cache.service.ts
import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
// import {  } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async get(key: string): Promise<any> {
    try {
      return JSON.parse(await this.cacheManager.get(key));
    } catch (e) {
      console.log({ e });
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      return await this.cacheManager.set(key, value, ttl);
    } catch (e) {
      console.log(e);
    }
  }

  // Add more cache-related operations as needed
}
