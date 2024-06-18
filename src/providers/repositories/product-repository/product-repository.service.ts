import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { ReadPrismaService } from 'src/prisma/read-prisma.service';
import { WritePrismaService } from 'src/prisma/write-prisma.service';

interface ICreateProduct {
  name: string;
  price: number;
  userId: number;
}

@Injectable()
export class ProductRepositoryService {
  constructor(
    @Inject('REDIS_CLIENT') private redisClient: Redis,
    private readPrisma: ReadPrismaService,
    private writePrisma: WritePrismaService,
  ) {}

  async createProduct(dto: ICreateProduct) {
    const product = await this.writePrisma.product.create({ data: dto });
    await this.redisClient.set(
      'product ' + product.id,
      JSON.stringify(product),
    );
    return product;
  }
}
