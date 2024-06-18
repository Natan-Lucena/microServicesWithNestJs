import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateProductDTO } from 'src/products/dtos/create-product.dto';
import { CreateProductService } from 'src/products/services/create-product/create-product.service';
import { UserDoesNotExistsException } from 'src/providers/errors/user-exceptions';

@Controller('product')
@UseGuards(JwtGuard)
export class CreateProductController {
  constructor(private createProductService: CreateProductService) {}

  @Post()
  async handle(
    @Body() dto: CreateProductDTO,
    @GetUser('email') userEmail: string,
  ) {
    try {
      return await this.createProductService.execute({
        name: dto.name,
        price: dto.price,
        userEmail,
      });
    } catch (error) {
      if (error instanceof UserDoesNotExistsException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
