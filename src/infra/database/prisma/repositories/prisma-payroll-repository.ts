import {
  findByPeriodParams,
  PayrollRepository,
} from '@/domain/RH/application/repositories/payroll-repository';
import { Payroll } from '@/domain/RH/enterprise/entities/payroll';
import { PrismaService } from '../prisma.service';
import { PrismaPayrollMapper } from '../mappers/prisma-payroll-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPayrollRepository implements PayrollRepository {
  constructor(private prisma: PrismaService) {}

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
  }
}
