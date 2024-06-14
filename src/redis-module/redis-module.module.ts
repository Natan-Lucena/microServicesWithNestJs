import { Global, Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import 'dotenv/config';
@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const host: string = process.env.REDIS_HOST;
        const port: string = process.env.REDIS_PORT;
        const client = new Redis({
          host,
          port: parseInt(port, 10),
        });
        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
