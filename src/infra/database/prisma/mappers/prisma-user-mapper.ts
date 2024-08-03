import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Role, User } from '@/domain/RH/enterprise/entities/user';
import { Prisma, User as PrismaUser, UserRole } from '@prisma/client';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        role: this.convertToUserDomainRole(raw.role),
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

  static convertToPrismaRole(roleString: string): UserRole {
    if (Object.values(UserRole).includes(roleString as UserRole)) {
      return roleString as UserRole;
    } else {
      throw new Error(`Invalid role: ${roleString}`);
    }
  }

  static convertToUserDomainRole(prismaRole: UserRole): Role {
    if (Object.values(Role).includes(prismaRole.toString() as Role)) {
      return prismaRole as Role;
    } else {
      throw new Error(`Invalid role: ${prismaRole}`);
    }
  }
}
