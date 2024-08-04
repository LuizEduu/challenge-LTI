import { PayrollBenefitsRepository } from '@/domain/RH/application/repositories/payroll-benefits-repository';
import { PrismaService } from '../prisma.service';
import { PayrollBenefits } from '@/domain/RH/enterprise/entities/payroll-benefits';
import { PrismaPayrollBenefitsMapper } from '../mappers/prisma-payoll-benefits-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPayrollBenefitsRepository
  implements PayrollBenefitsRepository
{
  constructor(private prisma: PrismaService) {}

  async create(payrollBenefits: PayrollBenefits[]): Promise<void> {
    const data = payrollBenefits.map(PrismaPayrollBenefitsMapper.toPrisma);

    await this.prisma.payrollBenefits.createMany({
      data,
    });
  }
}
