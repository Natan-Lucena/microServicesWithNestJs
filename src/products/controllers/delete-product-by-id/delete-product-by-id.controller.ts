import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { DeleteProductByIdService } from 'src/products/services/delete-product-by-id/delete-product-by-id.service';

@Controller('product/:id')
export class DeleteProductByIdController {
  constructor(private deleteProductByIdService: DeleteProductByIdService) {}

  @Delete()
  async handle(@Param('id', ParseIntPipe) productId: number) {
    await this.deleteProductByIdService.execute(productId);
  }
}
