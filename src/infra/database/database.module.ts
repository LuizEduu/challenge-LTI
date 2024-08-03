import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from '@/domain/RH/application/repositories/users-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';
import { DepartmentsRepository } from '@/domain/RH/application/repositories/departments-repository';
import { PrismaDepartmentsRepository } from './prisma/repositories/prisma-departments-repository';
import { UsersDepartmentsRepository } from '@/domain/RH/application/repositories/users-departments-repository';
import { PrismaUsersDepartmentsRepository } from './prisma/repositories/prisma-users-departments-repository';
import { BenefitsRepository } from '@/domain/RH/application/repositories/benefits-repository';
import { PrismaBenefitsRepository } from './prisma/repositories/prisma-benefits-repository';
import { UserBenefitsRepository } from '@/domain/RH/application/repositories/user-benefits-repository';
import { PrismaUserBenefitsRepository } from './prisma/repositories/prisma-user-benefits-repository';

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
    {
      provide: UsersDepartmentsRepository,
      useClass: PrismaUsersDepartmentsRepository,
    },
    {
      provide: BenefitsRepository,
      useClass: PrismaBenefitsRepository,
    },
    {
      provide: UserBenefitsRepository,
      useClass: PrismaUserBenefitsRepository,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    DepartmentsRepository,
    UsersDepartmentsRepository,
    BenefitsRepository,
    UserBenefitsRepository,
  ],
})
export class DatabaseModule {}
