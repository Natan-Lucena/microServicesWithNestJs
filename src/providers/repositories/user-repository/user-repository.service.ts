import { Inject, Injectable } from '@nestjs/common';
import { ReadPrismaService } from 'src/prisma/read-prisma.service';
import { WritePrismaService } from 'src/prisma/write-prisma.service';
import { Redis } from 'ioredis';
import { User } from 'prisma/generated/write/client';

interface ICreateUser {
  email: string;
  password: string;
  name: string;
}

@Injectable()
export class UserRepositoryService {
  constructor(
    @Inject('REDIS_CLIENT') private redisClient: Redis,
    private readPrisma: ReadPrismaService,
    private writePrisma: WritePrismaService,
  ) {}

  async findUserByEmail(email: string) {
    const userIsInMemory = await this.redisClient.get('user ' + email);
    if (userIsInMemory) {
      const user: User = JSON.parse(userIsInMemory);
      return user;
    }
    return await this.readPrisma.user.findUnique({ where: { email } });
  }

  async createUser(dto: ICreateUser) {
    const user = await this.writePrisma.user.create({ data: dto });
    await this.redisClient.set('user ' + user.email, JSON.stringify(user));
    return user;
  }
}
