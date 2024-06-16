import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpUserDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  name: string;
}
