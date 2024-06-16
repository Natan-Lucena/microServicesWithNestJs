import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryService } from 'src/providers/repositories/user-repository/user-repository.service';
import * as bcrypt from 'bcrypt';
import {
  InvalidCredentialsException,
  UserDoesNotExistsException,
} from 'src/providers/errors/user-exceptions';

interface ISignInUser {
  email: string;
  password: string;
}

@Injectable()
export class SignInUserService {
  constructor(
    private userRepository: UserRepositoryService,
    private jwtService: JwtService,
  ) {}

  async execute(dto: ISignInUser) {
    const user = await this.userRepository.findUserByEmail(dto.email);
    if (!user) {
      throw new UserDoesNotExistsException();
    }
    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) {
      throw new InvalidCredentialsException();
    }
    const payload = { email: user.email, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30m',
      secret: process.env.JWT_SECRET,
    });
    return { accessToken };
  }
}
