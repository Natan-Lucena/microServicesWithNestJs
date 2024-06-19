import {
  Controller,
  InternalServerErrorException,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReceiveProductImageService } from 'src/products/services/receive-product-image/receive-product-image.service';
import { ProductDoesNotExists } from 'src/providers/errors/product-exceptions';

@Controller('receive-product-image/:productId')
export class ReceiveProductImageController {
  constructor(private service: ReceiveProductImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 3000000 })],
      }),
    )
    file: Express.Multer.File,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    try {
      return await this.service.execute({ file, productId });
    } catch (e) {
      if (e instanceof ProductDoesNotExists) {
        throw new NotFoundException(e.message);
      }
      throw new InternalServerErrorException(e.message);
    }
  }
}
