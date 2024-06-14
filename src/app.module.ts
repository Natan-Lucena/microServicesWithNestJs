import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis-module/redis-module.module';

@Module({
  imports: [AuthModule, RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
