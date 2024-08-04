import { UserBenefits } from '@/domain/RH/enterprise/entities/user-benefits';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaUserBenefitMapper } from '../mappers/prisma-user-benefit-mapper';
import { UsersBenefitsRepository } from '@/domain/RH/application/repositories/users-benefits-repository';
import { UserBenefitsWithBenefitsFields } from '@/domain/RH/enterprise/entities/value-objects/user-benefits-with-benefit-fields';

@Injectable()
export class PrismaUsersBenefitsRepository implements UsersBenefitsRepository {
  constructor(private prisma: PrismaService) {}

  async findByBenefitId(id: string): Promise<UserBenefits[]> {
    const benefits = await this.prisma.userBenefits.findMany({
      where: {
        benefitId: id,
      },
    });

    return benefits.map(PrismaUserBenefitMapper.toDomain);
  }

  async create(userBenefits: UserBenefits[]): Promise<void> {
    const data = userBenefits.map(PrismaUserBenefitMapper.toPrisma);

    await this.prisma.userBenefits.createMany({
      data,
    });
  }

  async findManyByUserId(
    userId: string,
  ): Promise<UserBenefitsWithBenefitsFields[]> {
    const userBenefits = await this.prisma.userBenefits.findMany({
      where: {
        userId,
      },
      include: {
        benefit: true,
      },
    });

    return userBenefits.map(PrismaUserBenefitMapper.toDomainWithBenefitFields);
  }
}
