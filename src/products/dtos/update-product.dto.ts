import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
