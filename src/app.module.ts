import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis-module/redis-module.module';
import { ProvidersModule } from './providers/providers.module';
import { ProductsModule } from './products/products.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [AuthModule, RedisModule, ProvidersModule, ProductsModule, InfraModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
