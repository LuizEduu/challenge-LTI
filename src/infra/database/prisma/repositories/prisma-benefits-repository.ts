import { BenefitsRepository } from '@/domain/RH/application/repositories/benefits-repository';
import { Benefit } from '@/domain/RH/enterprise/entities/benefit';
import { PrismaService } from '../prisma.service';
import { PrismaBenefitMapper } from '../mappers/prisma-benefit-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaBenefitsRepository implements BenefitsRepository {
  constructor(private prisma: PrismaService) {}

  async create(benefit: Benefit): Promise<void> {
    const data = PrismaBenefitMapper.toPrisma(benefit);

    await this.prisma.benefit.create({
      data,
    });
  }

  async findByName(name: string): Promise<Benefit | null> {
    const benefit = await this.prisma.benefit.findFirst({
      where: {
        name,
      },
    });

    if (!benefit) {
      return null;
    }

    return PrismaBenefitMapper.toDomain(benefit);
  }
}
