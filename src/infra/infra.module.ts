import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ReadPrismaService } from 'src/prisma/read-prisma.service';
import { WritePrismaService } from 'src/prisma/write-prisma.service';
import { CleanDbInMemoryAndSaveInReadDbCronService } from './crons/clean-db-in-memory-and-save-in-read-db-cron/clean-db-in-memory-and-save-in-read-db-cron.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    ReadPrismaService,
    WritePrismaService,
    CleanDbInMemoryAndSaveInReadDbCronService,
  ],
})
export class InfraModule {}
