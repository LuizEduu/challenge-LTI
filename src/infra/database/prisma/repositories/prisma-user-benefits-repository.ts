import { UserBenefitsRepository } from '@/domain/RH/application/repositories/user-benefits-repository';
import { UserBenefits } from '@/domain/RH/enterprise/entities/user-benefits';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaUserBenefitMapper } from '../mappers/prisma-user-benefit-mapper';

@Injectable()
export class PrismaUserBenefitsRepository implements UserBenefitsRepository {
  constructor(private prisma: PrismaService) {}
  async findByBenefitId(id: string): Promise<UserBenefits[]> {
    const benefits = await this.prisma.userBenefits.findMany({
      where: {
        benefitId: id,
      },
    });

    return benefits.map(PrismaUserBenefitMapper.toDomain);
  }
}
