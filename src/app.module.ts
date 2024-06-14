import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis-module/redis-module.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [AuthModule, RedisModule, ProvidersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
