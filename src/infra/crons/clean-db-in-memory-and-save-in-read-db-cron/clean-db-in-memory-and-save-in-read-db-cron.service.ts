import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Redis } from 'ioredis';
import { ReadPrismaService } from 'src/prisma/read-prisma.service';
import { WritePrismaService } from 'src/prisma/write-prisma.service';

@Injectable()
export class CleanDbInMemoryAndSaveInReadDbCronService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    private readonly readPrisma: ReadPrismaService,
    private readonly writePrisma: WritePrismaService,
  ) {}

  @Cron('1 1 0 * * *')
  async execute() {
    try {
      await this.saveWriteDbToReadDb();
      await this.cleanRedis();
      console.log('Cron job executed successfully');
    } catch (error) {
      console.error('Error executing cron job:', error);
    }
  }

  private async saveWriteDbToReadDb() {
    try {
      const images = await this.writePrisma.image.findMany();
      const products = await this.writePrisma.product.findMany();
      const users = await this.writePrisma.user.findMany();

      await this.readPrisma.image.deleteMany();
      await this.readPrisma.product.deleteMany();
      await this.readPrisma.user.deleteMany();

      await this.readPrisma.image.createMany({ data: images });
      await this.readPrisma.product.createMany({ data: products });
      await this.readPrisma.user.createMany({ data: users });

      console.log('Data transferred from write DB to read DB');
    } catch (error) {
      console.error('Error saving data to read database:', error);
    }
  }

  private async cleanRedis() {
    try {
      const keys = await this.redisClient.keys('*');
      if (keys.length) {
        const pipeline = this.redisClient.pipeline();
        keys.forEach((key) => {
          pipeline.del(key);
        });
        await pipeline.exec();
        console.log('Redis cache cleared');
      } else {
        console.log('No keys found in Redis');
      }
    } catch (error) {
      console.error('Error cleaning Redis cache:', error);
    }
  }
}
