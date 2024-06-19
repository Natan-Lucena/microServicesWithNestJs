import { Module } from '@nestjs/common';
import { CreateProductService } from './services/create-product/create-product.service';
import { CreateProductController } from './controllers/create-product/create-product.controller';
import { WritePrismaService } from 'src/prisma/write-prisma.service';
import { ReadPrismaService } from 'src/prisma/read-prisma.service';
import { UserRepositoryService } from 'src/providers/repositories/user-repository/user-repository.service';
import { ProductRepositoryService } from 'src/providers/repositories/product-repository/product-repository.service';
import { JwtStrategy } from 'src/auth/strategy/jwt-strategy';
import { ReceiveProductImageService } from './services/receive-product-image/receive-product-image.service';
import { ReceiveProductImageController } from './controllers/receive-product-image/receive-product-image.controller';

@Module({
  providers: [
    JwtStrategy,
    WritePrismaService,
    ReadPrismaService,
    UserRepositoryService,
    ProductRepositoryService,
    CreateProductService,
    ReceiveProductImageService,
  ],
  controllers: [CreateProductController, ReceiveProductImageController],
})
export class ProductsModule {}
