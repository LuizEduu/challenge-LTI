import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Department } from '@/domain/RH/enterprise/entities/departments';
import { Prisma, Department as PrismaDepartment } from '@prisma/client';

export class PrismaDepartmentMapper {
  static toDomain(raw: PrismaDepartment): Department {
    return Department.create(
      {
        name: raw.name,
        managerId: new UniqueEntityID(raw.managerId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    department: Department,
  ): Prisma.DepartmentUncheckedCreateInput {
    return {
      id: department.id.toString(),
      name: department.name,
      managerId: department.managerId.toString(),
    };
  }
}
