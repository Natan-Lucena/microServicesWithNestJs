import { Injectable } from '@nestjs/common';
import { UserDoesNotExistsException } from 'src/providers/errors/user-exceptions';
import { ProductRepositoryService } from 'src/providers/repositories/product-repository/product-repository.service';
import { UserRepositoryService } from 'src/providers/repositories/user-repository/user-repository.service';

interface ICreateProduct {
  name: string;
  price: number;
  userEmail: string;
}

@Injectable()
export class CreateProductService {
  constructor(
    private productRepositoryService: ProductRepositoryService,
    private userRepositoryService: UserRepositoryService,
  ) {}

  async execute(dto: ICreateProduct) {
    const user = await this.userRepositoryService.findUserByEmail(
      dto.userEmail,
    );
    if (!user) {
      throw new UserDoesNotExistsException();
    }
    return this.productRepositoryService.createProduct({
      name: dto.name,
      price: dto.price,
      userId: user.id,
    });
  }
}
