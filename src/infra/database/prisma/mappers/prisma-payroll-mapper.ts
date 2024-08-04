import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Payroll } from '@/domain/RH/enterprise/entities/payroll';
import { Prisma, Payroll as PrismaPayoll } from '@prisma/client';

export class PrismaPayrollMapper {
  static toDomain(raw: PrismaPayoll): Payroll {
    return Payroll.create(
      {
        name: raw.name,
        firstPeriod: raw.firstPeriod,
        departmentId: new UniqueEntityID(raw.departmentId),
        month: raw.month,
        totalPayment: raw.totalPayment,
        year: raw.year,
        lastPeriod: raw.lastPeriod,
        emplooyeId: new UniqueEntityID(raw.emplooyeId),
        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(payroll: Payroll): Prisma.PayrollUncheckedCreateInput {
    return {
      id: payroll.id.toString(),
      name: payroll.name,
      firstPeriod: payroll.firstPeriod,
      departmentId: payroll.departmentId.toString(),
      month: payroll.month,
      totalPayment: payroll.totalPayment,
      year: payroll.year,
      lastPeriod: payroll.lastPeriod,
      emplooyeId: payroll.emplooyeId.toString(),
      createdAt: payroll.createdAt,
    };
  }
}
