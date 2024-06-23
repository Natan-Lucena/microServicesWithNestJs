import { Body, Controller, Param, ParseIntPipe, Put } from '@nestjs/common';
import { UpdateProductDTO } from 'src/products/dtos/update-product.dto';
import { UpdateProductByIdService } from 'src/products/services/update-product-by-id/update-product-by-id.service';

@Controller('product/:id')
export class UpdateProductByIdController {
  constructor(private updateProductByIdService: UpdateProductByIdService) {}

  @Put()
  async updateProductById(
    @Param('id', ParseIntPipe) productId: number,
    @Body() body: UpdateProductDTO,
  ) {
    return await this.updateProductByIdService.execute({
      ...body,
      id: productId,
    });
  }
}
