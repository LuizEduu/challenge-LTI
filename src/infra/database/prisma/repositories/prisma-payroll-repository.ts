import {
  findByPeriodParams,
  PayrollRepository,
} from '@/domain/RH/application/repositories/payroll-repository';
import { Payroll } from '@/domain/RH/enterprise/entities/payroll';
import { PrismaService } from '../prisma.service';
import { PrismaPayrollMapper } from '../mappers/prisma-payroll-mapper';
import { Injectable } from '@nestjs/common';
import { PayrollBenefitsRepository } from '@/domain/RH/application/repositories/payroll-benefits-repository';
import { PayrollBenefits } from '@/domain/RH/enterprise/entities/payroll-benefits';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

@Injectable()
export class PrismaPayrollRepository implements PayrollRepository {
  constructor(
    private prisma: PrismaService,
    private payrollBenefitsRepository: PayrollBenefitsRepository,
  ) {}

  async findByPeriod({
    firstPeriod,
    lastPeriod,
    userId,
  }: findByPeriodParams): Promise<Payroll | null> {
    const payroll = await this.prisma.payroll.findFirst({
      where: {
        AND: [
          {
            firstPeriod: { gte: firstPeriod },
            lastPeriod: { lte: lastPeriod },
          },
        ],
        emplooyeId: userId,
      },
    });

    if (!payroll) {
      return null;
    }

    return PrismaPayrollMapper.toDomain(payroll);
  }

  async create(payroll: Payroll): Promise<void> {
    const data = PrismaPayrollMapper.toPrisma(payroll);

    await this.prisma.payroll.create({
      data,
    });

    const payrollBenefits = payroll.benefitsIds?.map((id) =>
      PayrollBenefits.create({
        benefitId: new UniqueEntityID(id),
        payrollId: payroll.id,
      }),
    );

    payrollBenefits?.length &&
      (await this.payrollBenefitsRepository.create(payrollBenefits));
  }
}
