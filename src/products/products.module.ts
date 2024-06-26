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
import { GetUserProductsService } from './services/get-user-products/get-user-products.service';
import { GetUserProductsController } from './controllers/get-user-products/get-user-products.controller';
import { UpdateProductByIdService } from './services/update-product-by-id/update-product-by-id.service';
import { UpdateProductByIdController } from './controllers/update-product-by-id/update-product-by-id.controller';
import { DeleteProductByIdService } from './services/delete-product-by-id/delete-product-by-id.service';
import { DeleteProductByIdController } from './controllers/delete-product-by-id/delete-product-by-id.controller';
import { DeleteImageByIdService } from './services/delete-image-by-id/delete-image-by-id.service';
import { DeleteImageByIdController } from './controllers/delete-image-by-id/delete-image-by-id.controller';

@Module({
  providers: [
    JwtStrategy,
    WritePrismaService,
    ReadPrismaService,
    UserRepositoryService,
    ProductRepositoryService,
    CreateProductService,
    ReceiveProductImageService,
    GetUserProductsService,
    UpdateProductByIdService,
    DeleteProductByIdService,
    DeleteImageByIdService,
  ],
  controllers: [
    CreateProductController,
    ReceiveProductImageController,
    GetUserProductsController,
    UpdateProductByIdController,
    DeleteProductByIdController,
    DeleteImageByIdController,
  ],
})
export class ProductsModule {}
