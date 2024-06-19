import { Inject, Injectable } from '@nestjs/common';
import 'dotenv/config';
import { Redis } from 'ioredis';
import { Image } from 'prisma/generated/read/client';
import { ReadPrismaService } from 'src/prisma/read-prisma.service';
import { ProductDoesNotExists } from 'src/providers/errors/product-exceptions';

interface IReceiveProductImage {
  file: Express.Multer.File;
  productId: number;
}

@Injectable()
export class ReceiveProductImageService {
  constructor(
    @Inject('REDIS_CLIENT') private redisClient: Redis,
    private readPrismaService: ReadPrismaService,
  ) {}

  async execute(dto: IReceiveProductImage) {
    const productIsInMemory = await this.redisClient.get(
      'product ' + dto.productId,
    );
    if (!productIsInMemory) {
      const productExists = await this.readPrismaService.product.findUnique({
        where: { id: dto.productId },
      });
      if (!productExists) {
        throw new ProductDoesNotExists();
      }
    }
    const url =
      process.env.MICROSERVICE_TO_HANDLE_FILES +
      '/upload-image/' +
      dto.productId;

    const formData = new FormData();
    const fileBlob = new Blob([dto.file.buffer], { type: dto.file.mimetype });
    formData.append('file', fileBlob, dto.file.originalname);

    const response: Image = await fetch(url, {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());
    await this.redisClient.set(
      'image ' + response.id,
      JSON.stringify(response),
    );
    return response;
  }
}
