import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { SignInUserDTO } from 'src/auth/dtos/sign-in-user.dto';
import { SignInUserService } from 'src/auth/services/sign-in-user/sign-in-user.service';
import {
  InvalidCredentialsException,
  UserDoesNotExistsException,
} from 'src/providers/errors/user-exceptions';

@Controller('sign-in')
export class SignInUserController {
  constructor(private service: SignInUserService) {}

  @Post()
  async handle(@Body() dto: SignInUserDTO) {
    try {
      return await this.service.execute(dto);
    } catch (e) {
      if (
        e instanceof UserDoesNotExistsException ||
        e instanceof InvalidCredentialsException
      ) {
        throw new BadRequestException('User does not exists');
      }
      throw new InternalServerErrorException(e.message);
    }
  }
}
