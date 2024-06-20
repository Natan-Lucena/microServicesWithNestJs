import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { Product } from 'prisma/generated/read/client';
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
    const userAlreadyHasProducts = await this.redisClient.get(
      'userProducts ' + dto.userId,
    );
    if (userAlreadyHasProducts) {
      const products: Product[] = JSON.parse(userAlreadyHasProducts);
      products.push(product);
      await this.redisClient.set(
        'userProducts ' + dto.userId,
        JSON.stringify(products),
      );
      return product;
    }
    await this.redisClient.set(
      'userProducts ' + dto.userId,
      JSON.stringify([product]),
    );
    return product;
  }
  async getProductsByUserId(userId: number) {
    const userProducts = await this.redisClient.get('userProducts ' + userId);
    if (userProducts) {
      const productsInCache: Product[] = JSON.parse(userProducts);
      return productsInCache;
    }
    const products = await this.readPrisma.product.findMany({
      where: { userId },
    });
    await this.redisClient.set(
      'userProducts ' + userId,
      JSON.stringify(products),
    );
    return products;
  }
}
