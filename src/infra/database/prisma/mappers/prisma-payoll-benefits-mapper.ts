import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { PayrollBenefits } from '@/domain/RH/enterprise/entities/payroll-benefits';
import {
  Prisma,
  PayrollBenefits as PrismaPayrollBenefits,
} from '@prisma/client';

export class PrismaPayrollBenefitsMapper {
  static toDomain(raw: PrismaPayrollBenefits): PayrollBenefits {
    return PayrollBenefits.create(
      {
        benefitId: new UniqueEntityID(raw.benefitId),
        payrollId: new UniqueEntityID(raw.payrollId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    payrollBenefit: PayrollBenefits,
  ): Prisma.PayrollBenefitsUncheckedCreateInput {
    return {
      id: payrollBenefit.id.toString(),
      payrollId: payrollBenefit.payrollId.toString(),
      benefitId: payrollBenefit.benefitId.toString(),
      createdAt: payrollBenefit.createdAt,
    };
  }
}
