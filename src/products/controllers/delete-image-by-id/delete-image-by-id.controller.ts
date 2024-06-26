import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { DeleteImageByIdService } from 'src/products/services/delete-image-by-id/delete-image-by-id.service';

@Controller('product-image/:id')
export class DeleteImageByIdController {
  constructor(private service: DeleteImageByIdService) {}

  @Delete()
  async handle(@Param('id', ParseIntPipe) imageId: number) {
    await this.service.execute(imageId);
  }
}
