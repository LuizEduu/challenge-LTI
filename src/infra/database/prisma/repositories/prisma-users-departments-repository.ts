import { UsersDepartmentsRepository } from '@/domain/RH/application/repositories/users-departments-repository';
import { UserDepartments } from '@/domain/RH/enterprise/entities/user-departments';
import { PrismaService } from '../prisma.service';
import { PrismaUsersDepartmentsMapper } from '../mappers/prisma-users-departments-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUsersDepartmentsRepository
  implements UsersDepartmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async create(userDepartments: UserDepartments[]): Promise<void> {
    const data = userDepartments.map(PrismaUsersDepartmentsMapper.toPrisma);

    await this.prisma.userDepartment.createMany({
      data,
    });
  }
}
