import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { WritePrismaService } from 'src/prisma/write-prisma.service';

@Injectable()
export class DeleteProductByIdService {
  constructor(
    @Inject('REDIS_CLIENT') private redisClient: Redis,
    private writePrismaService: WritePrismaService,
  ) {}

  async execute(productId: number) {
    await this.redisClient.del('product ' + productId);
    await this.redisClient.del('productImages ' + productId);
    await this.writePrismaService.image.deleteMany({ where: { productId } });
    await this.writePrismaService.product.delete({ where: { id: productId } });
  }
}
