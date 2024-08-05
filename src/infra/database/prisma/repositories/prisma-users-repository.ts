import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  fetchByParamsRequest,
  UsersRepository,
} from '@/domain/RH/application/repositories/users-repository';
import { User } from '@/domain/RH/enterprise/entities/user';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { UsersDepartmentsRepository } from '@/domain/RH/application/repositories/users-departments-repository';
import { UserDepartments } from '@/domain/RH/enterprise/entities/user-departments';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { UsersBenefitsRepository } from '@/domain/RH/application/repositories/users-benefits-repository';
import { UserBenefits } from '@/domain/RH/enterprise/entities/user-benefits';
import { UserRole } from '@prisma/client';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(
    private prisma: PrismaService,
    private usersDepartmentsRepository: UsersDepartmentsRepository,
    private usersBenefitsRepository: UsersBenefitsRepository,
  ) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data,
    });

    const userDepartments = user.departmentsIds.map((id) => {
      return UserDepartments.create({
        userId: user.id,
        departmentId: new UniqueEntityID(id),
      });
    });

    await this.usersDepartmentsRepository.create(userDepartments);

    const userBenefits = user.benefitsIds.map((id) => {
      return UserBenefits.create({
        userId: user.id,
        benefitId: new UniqueEntityID(id),
      });
    });

    await this.usersBenefitsRepository.create(userBenefits);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async fetchByParams({
    id,
    email,
    name,
    role,
    createdAt,
  }: fetchByParamsRequest): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        id: id,
        email,
        name,
        role: role as UserRole,
        createdAt: {
          gte: createdAt, // Maior ou igual a createdAt
        },
      },
      include: {
        UserDepartment: true,
      },
    });

    return users.map(PrismaUserMapper.toDomainWIthDeparments);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async update(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.update({
      data,
      where: {
        id: user.id.toString(),
      },
    });

    const userDepartments = user.departmentsIds?.map((id) =>
      UserDepartments.create({
        departmentId: new UniqueEntityID(id),
        userId: user.id,
      }),
    );

    const userBenefits = user.benefitsIds?.map((id) =>
      UserBenefits.create({
        benefitId: new UniqueEntityID(id),
        userId: user.id,
      }),
    );

    await Promise.all([
      userDepartments.length &&
        this.usersDepartmentsRepository.update(userDepartments),
      userBenefits.length && this.usersBenefitsRepository.update(userBenefits),
    ]);
  }
}
