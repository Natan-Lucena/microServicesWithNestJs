import { Module } from '@nestjs/common';
import { SignUpUserService } from './services/sign-up-user/sign-up-user.service';
import { ReadPrismaService } from 'src/prisma/read-prisma.service';
import { WritePrismaService } from 'src/prisma/write-prisma.service';
import { UserRepositoryService } from 'src/providers/repositories/user-repository/user-repository.service';
import { MailerProviderService } from 'src/providers/services/mailer-provider/mailer-provider.service';
import { SignUpUserController } from './controllers/sign-up-user/sign-up-user.controller';

@Module({
  providers: [
    SignUpUserService,
    ReadPrismaService,
    WritePrismaService,
    UserRepositoryService,
    MailerProviderService,
  ],
  controllers: [SignUpUserController],
})
export class AuthModule {}
