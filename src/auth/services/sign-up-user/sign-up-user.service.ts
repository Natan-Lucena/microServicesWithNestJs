import { Injectable } from '@nestjs/common';
import { UserAlreadyExistsException } from 'src/providers/errors/user-exceptions';
import { UserRepositoryService } from 'src/providers/repositories/user-repository/user-repository.service';
import { MailerProviderService } from 'src/providers/services/mailer-provider/mailer-provider.service';
import * as bcrypt from 'bcrypt';

interface ISignUpUserDTO {
  email: string;
  password: string;
  name: string;
}

@Injectable()
export class SignUpUserService {
  constructor(
    private userRepository: UserRepositoryService,
    private mailerProvider: MailerProviderService,
  ) {}

  async execute(dto: ISignUpUserDTO) {
    const userAlreadyExists = await this.userRepository.findUserByEmail(
      dto.email,
    );
    if (userAlreadyExists) {
      throw new UserAlreadyExistsException();
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.createUser({
      ...dto,
      password: hashedPassword,
    });
    await this.mailerProvider.sendEmail({
      to: user.email,
      subject: 'Welcome to our platform',
      body:
        'Welcome to our platform, click here to login: http://localhost:3000/active-user/' +
        dto.email,
    });
  }
}
