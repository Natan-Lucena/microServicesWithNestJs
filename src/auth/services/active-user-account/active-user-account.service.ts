import { Injectable } from '@nestjs/common';
import { UserRepositoryService } from 'src/providers/repositories/user-repository/user-repository.service';

@Injectable()
export class ActiveUserAccountService {
  constructor(private userRepository: UserRepositoryService) {}

  async execute(email: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user.active) {
      await this.userRepository.activeUserByEmail(email);
    }
  }
}
