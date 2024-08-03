import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from '@/domain/RH/application/repositories/users-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';
import { DepartmentsRepository } from '@/domain/RH/application/repositories/departments-repository';
import { PrismaDepartmentsRepository } from './prisma/repositories/prisma-departments-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: DepartmentsRepository,
      useClass: PrismaDepartmentsRepository,
    },
  ],
  exports: [PrismaService, UsersRepository, DepartmentsRepository],
})
export class DatabaseModule {}
