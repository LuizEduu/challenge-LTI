import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Payroll } from '@/domain/RH/enterprise/entities/payroll';
import { PayrollReport } from '@/domain/RH/enterprise/entities/value-objects/payroll report';
import {
  Prisma,
  Payroll as PrismaPayoll,
  Department as PrismaDepartment,
  User as PrismaUser,
} from '@prisma/client';

type PrismaToDomainPayrollReport = PrismaPayoll & {
  department: PrismaDepartment;
  user: PrismaUser;
  PayrollBenefits: {
    benefit: {
      id: string;
      name: string;
      description: string;
      createdAt: Date;
      updatedAt: Date;
      value: number;
    };
  }[];
};

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

  static toDomainPayrollReport(
    raw: PrismaToDomainPayrollReport,
  ): PayrollReport {
    return PayrollReport.create({
      emplooyeId: new UniqueEntityID(raw.user.id),
      emplooyeName: raw.user.name,
      employeEmail: raw.user.email,
      departmentId: new UniqueEntityID(raw.department.id),
      firstPeriod: raw.firstPeriod,
      lastPeriod: raw.lastPeriod,
      month: raw.month,
      year: raw.year,
      totalPayment: raw.totalPayment,
      benefits: raw.PayrollBenefits.map((pb) => ({
        name: pb.benefit.name,
        value: pb.benefit.value,
      })),
    });
  }
}
