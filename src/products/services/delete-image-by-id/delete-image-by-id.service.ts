import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { WritePrismaService } from 'src/prisma/write-prisma.service';

@Injectable()
export class DeleteImageByIdService {
  constructor(
    @Inject('REDIS_CLIENT') private redisClient: Redis,
    private writePrismaService: WritePrismaService,
  ) {}

  async execute(imageId: number) {
    await this.redisClient.del('image ' + imageId);
    await this.writePrismaService.image.delete({ where: { id: imageId } });
  }
}
