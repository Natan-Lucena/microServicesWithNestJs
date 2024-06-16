import { Module } from '@nestjs/common';
import { SignUpUserService } from './services/sign-up-user/sign-up-user.service';
import { ReadPrismaService } from 'src/prisma/read-prisma.service';
import { WritePrismaService } from 'src/prisma/write-prisma.service';
import { UserRepositoryService } from 'src/providers/repositories/user-repository/user-repository.service';
import { MailerProviderService } from 'src/providers/services/mailer-provider/mailer-provider.service';
import { SignUpUserController } from './controllers/sign-up-user/sign-up-user.controller';
import { ActiveUserAccountService } from './services/active-user-account/active-user-account.service';
import { ActiveUserAccountController } from './controllers/active-user-account/active-user-account.controller';
import { SignInUserService } from './services/sign-in-user/sign-in-user.service';
import { SignInUserController } from './controllers/sign-in-user/sign-in-user.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    JwtService,
    SignUpUserService,
    ReadPrismaService,
    WritePrismaService,
    UserRepositoryService,
    MailerProviderService,
    ActiveUserAccountService,
    SignInUserService,
  ],
  controllers: [
    SignUpUserController,
    ActiveUserAccountController,
    SignInUserController,
  ],
})
export class AuthModule {}
