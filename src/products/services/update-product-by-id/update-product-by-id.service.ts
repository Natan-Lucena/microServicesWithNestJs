import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { Redis } from 'ioredis';
import { Product } from 'prisma/generated/read/client';
import { WritePrismaService } from 'src/prisma/write-prisma.service';

interface IProduct {
  id: number;
  name: string;
  price: number;
}

@Injectable()
export class UpdateProductByIdService {
  constructor(
    @Inject('REDIS_CLIENT') private redisClient: Redis,
    private writePrismaService: WritePrismaService,
  ) {}

  async execute(dto: IProduct) {
    const productIsInCache = await this.redisClient.get('product ' + dto.id);
    if (productIsInCache) {
      const productInstance: Product = JSON.parse(productIsInCache);
      productInstance.name = dto.name;
      productInstance.price = new Decimal(dto.price);
      await this.redisClient.set(
        'product ' + dto.id,
        JSON.stringify(productInstance),
      );
      await this.writePrismaService.product.update({
        where: { id: dto.id },
        data: { name: dto.name, price: dto.price },
      });
      return productInstance;
    }
    const productIsInDb = await this.writePrismaService.product.findFirst({
      where: { id: dto.id },
    });
    if (!productIsInDb) {
      throw new BadRequestException('Product does not exists');
    }
    return await this.writePrismaService.product.update({
      where: { id: dto.id },
      data: { name: dto.name, price: dto.price },
    });
  }
}
