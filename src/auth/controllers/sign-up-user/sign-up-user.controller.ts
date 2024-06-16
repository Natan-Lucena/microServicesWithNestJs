import { Body, Controller, Post } from '@nestjs/common';
import { SignUpUserDTO } from 'src/auth/dtos/sign-up-user.dto';
import { SignUpUserService } from 'src/auth/services/sign-up-user/sign-up-user.service';

@Controller('sign-up')
export class SignUpUserController {
  constructor(private service: SignUpUserService) {}

  @Post()
  async handle(@Body() dto: SignUpUserDTO) {
    return await this.service.execute(dto);
  }
}
