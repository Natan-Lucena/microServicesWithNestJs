import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis-module/redis-module.module';
import { ProvidersModule } from './providers/providers.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [AuthModule, RedisModule, ProvidersModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
