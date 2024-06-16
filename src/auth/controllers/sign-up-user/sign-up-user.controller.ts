import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { SignUpUserDTO } from 'src/auth/dtos/sign-up-user.dto';
import { SignUpUserService } from 'src/auth/services/sign-up-user/sign-up-user.service';
import { UserAlreadyExistsException } from 'src/providers/errors/user-exceptions';

@Controller('sign-up')
export class SignUpUserController {
  constructor(private service: SignUpUserService) {}

  @Post()
  async handle(@Body() dto: SignUpUserDTO) {
    try {
      return await this.service.execute(dto);
    } catch (e) {
      if (e instanceof UserAlreadyExistsException) {
        throw new BadRequestException('User already exists');
      }
      throw new InternalServerErrorException(e.message);
    }
  }
}
