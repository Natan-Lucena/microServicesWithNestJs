import { Controller, Get, Param } from '@nestjs/common';
import { ActiveUserAccountService } from 'src/auth/services/active-user-account/active-user-account.service';

@Controller('active-user/:email')
export class ActiveUserAccountController {
  constructor(private service: ActiveUserAccountService) {}

  @Get()
  async handle(@Param('email') email: string) {
    return await this.service.execute(email);
  }
}
