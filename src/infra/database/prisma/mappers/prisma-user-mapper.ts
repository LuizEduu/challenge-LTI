import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { User } from '@/domain/RH/enterprise/entities/user';
import { UserWithDepartmentsAndBenefits } from '@/domain/RH/enterprise/entities/value-objects/user-with-departments-and-benefits';
import { Prisma, User as PrismaUser, UserRole } from '@prisma/client';

type fetchUsersWithDepartmentsAndBenefits = PrismaUser & {
  UserDepartment: {
    id: string;
    userId: string;
    departmentId: string;
    createdAt: Date;
    department: {
      id: string;
      name: string;
      managerId: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
  UserBenefits: {
    id: string;
    benefitId: string;
    userId: string;
    benefit: {
      id: string;
      name: string;
      description: string;
      createdAt: Date;
      updatedAt: Date;
      value: number;
    };
  }[];
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

  static toDomainWIthDeparmentsAndBenefits(
    raw: fetchUsersWithDepartmentsAndBenefits,
  ) {
    return UserWithDepartmentsAndBenefits.create({
      userId: new UniqueEntityID(raw.id),
      name: raw.name,
      email: raw.email,
      role: raw.role.toString(),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      benefits: raw.UserBenefits.map((userBenefit) => ({
        id: new UniqueEntityID(userBenefit.benefit.id),
        name: userBenefit.benefit.name,
        description: userBenefit.benefit.description,
      })),
      departments: raw.UserDepartment.map((userDepartment) => ({
        id: new UniqueEntityID(userDepartment.department.id),
        name: userDepartment.department.name,
        managerId: new UniqueEntityID(userDepartment.department.managerId),
      })),
    });
  }
}
