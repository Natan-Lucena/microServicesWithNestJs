import {
  Controller,
  Get,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetUserProductsService } from 'src/products/services/get-user-products/get-user-products.service';

@Controller('get-products')
@UseGuards(JwtGuard)
export class GetUserProductsController {
  constructor(private getUserProductsService: GetUserProductsService) {}

  @Get()
  async handle(@GetUser('id') userId: number) {
    try {
      return await this.getUserProductsService.execute(userId);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
