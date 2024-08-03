import { UserBenefits } from '@/domain/RH/enterprise/entities/user-benefits';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaUserBenefitMapper } from '../mappers/prisma-user-benefit-mapper';
import { UsersBenefitsRepository } from '@/domain/RH/application/repositories/users-benefits-repository';

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
}
