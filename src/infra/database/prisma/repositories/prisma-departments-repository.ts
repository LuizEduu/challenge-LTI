import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  DepartmentsRepository,
  fetchByParamsRequest,
} from '@/domain/RH/application/repositories/departments-repository';
import { Department } from '@/domain/RH/enterprise/entities/departments';
import { PrismaDepartmentMapper } from '../mappers/prisma-department-mapper';

@Injectable()
export class PrismaDepartmentsRepository implements DepartmentsRepository {
  constructor(private prisma: PrismaService) {}

  async findByName(name: string): Promise<Department | null> {
    const department = await this.prisma.department.findFirst({
      where: {
        name,
      },
    });

    if (!department) {
      return null;
    }

    return PrismaDepartmentMapper.toDomain(department);
  }

  async create(deparment: Department): Promise<void> {
    const data = PrismaDepartmentMapper.toPrisma(deparment);

    await this.prisma.department.create({
      data,
    });
  }

  async fetchByParams({
    id,
    name,
    managerId,
    createdAt,
  }: fetchByParamsRequest): Promise<Department[]> {
    const departments = await this.prisma.department.findMany({
      where: {
        id: id,
        name,
        managerId,
        createdAt: {
          gte: createdAt,
        },
      },
    });

    return departments.map(PrismaDepartmentMapper.toDomain);
  }

  async findById(id: string): Promise<Department | null> {
    const department = await this.prisma.department.findUnique({
      where: {
        id,
      },
    });

    if (!department) {
      return null;
    }

    return PrismaDepartmentMapper.toDomain(department);
  }

  async update(department: Department): Promise<void> {
    const data = PrismaDepartmentMapper.toPrisma(department);

    console.log(data);

    await this.prisma.department.update({
      data,
      where: {
        id: department.id.toString(),
      },
    });
  }
}
