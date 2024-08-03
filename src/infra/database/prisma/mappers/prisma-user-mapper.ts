import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { User } from '@/domain/RH/enterprise/entities/user';
import { Prisma, User as PrismaUser, UserRole } from '@prisma/client';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        role: raw.role.toString(),
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
}
