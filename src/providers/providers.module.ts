import { Module } from '@nestjs/common';
import { UserRepositoryService } from './repositories/user-repository/user-repository.service';
import { MailerProviderService } from './services/mailer-provider/mailer-provider.service';
import { WritePrismaService } from 'src/prisma/write-prisma.service';
import { ReadPrismaService } from 'src/prisma/read-prisma.service';

@Module({
  providers: [
    UserRepositoryService,
    MailerProviderService,
    WritePrismaService,
    ReadPrismaService,
  ],
})
export class ProvidersModule {}
