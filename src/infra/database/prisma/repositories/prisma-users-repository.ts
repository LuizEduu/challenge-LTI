import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  fetchByParamsRequest,
  UsersRepository,
} from '@/domain/RH/application/repositories/users-repository';
import { User } from '@/domain/RH/enterprise/entities/user';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { UserRole } from '@prisma/client';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data,
    });
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
    });

    return users.map(PrismaUserMapper.toDomain);
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
  }
}
