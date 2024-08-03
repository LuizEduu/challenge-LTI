import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { User } from '@/domain/RH/enterprise/entities/user';
import { UserDepartments } from '@/domain/RH/enterprise/entities/user-departments';
import { $Enums, Prisma, User as PrismaUser, UserRole } from '@prisma/client';

type fetchUsersWithDepartments = {
  UserDepartment: {
    id: string;
    userId: string;
    departmentId: string;
    createdAt: Date;
  }[];
} & {
  id: string;
  name: string;
  email: string;
  password: string;
  role: $Enums.UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        role: raw.role.toString(),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      role: this.convertToPrismaRole(user.role),
    };
  }

  static convertToPrismaRole(roleString: string) {
    if (Object.values(UserRole).includes(roleString as UserRole)) {
      return roleString as UserRole;
    }
  }

  static toDomainWIthDeparments(raw: fetchUsersWithDepartments) {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        role: raw.role.toString(),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        userDepartments: raw.UserDepartment.map((department) => {
          return UserDepartments.create(
            {
              departmentId: new UniqueEntityID(department.departmentId),
              userId: new UniqueEntityID(raw.id),
              createdAt: department.createdAt,
            },
            new UniqueEntityID(department.id),
          );
        }),
      },
      new UniqueEntityID(raw.id),
    );
  }
}
