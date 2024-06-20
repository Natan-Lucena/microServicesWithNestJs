import { Injectable } from '@nestjs/common';
import { ProductRepositoryService } from 'src/providers/repositories/product-repository/product-repository.service';

@Injectable()
export class GetUserProductsService {
  constructor(private productRepository: ProductRepositoryService) {}

  async execute(userId: number) {
    const products = await this.productRepository.getProductsByUserId(userId);
    return products;
  }
}
