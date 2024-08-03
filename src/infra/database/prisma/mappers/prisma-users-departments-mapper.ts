import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { UserDepartments } from '@/domain/RH/enterprise/entities/user-departments';
import { Prisma, UserDepartment as PrismaUserDepartment } from '@prisma/client';

export class PrismaUsersDepartmentsMapper {
  static toDomain(raw: PrismaUserDepartment): UserDepartments {
    return UserDepartments.create(
      {
        userId: new UniqueEntityID(raw.userId),
        departmentId: new UniqueEntityID(raw.departmentId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    userDepartment: UserDepartments,
  ): Prisma.UserDepartmentUncheckedCreateInput {
    return {
      id: userDepartment.id.toString(),
      userId: userDepartment.userId.toString(),
      departmentId: userDepartment.departmentId.toString(),
      createdAt: userDepartment.createdAt ?? new Date(),
    };
  }
}
