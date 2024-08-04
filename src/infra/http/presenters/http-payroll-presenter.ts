import { Payroll } from '@/domain/RH/enterprise/entities/payroll';

export class HttpPayrollPresenter {
  static toHTTP(payroll: Payroll) {
    return {
      id: payroll.id.toString(),
      name: payroll.name,
      firstPeriod: payroll.firstPeriod,
      lastPeriod: payroll.lastPeriod,
      month: payroll.month,
      year: payroll.year,
      departmentId: payroll.departmentId.toString(),
      totalPayment: payroll.totalPayment,
      createdAt: payroll.createdAt,
      updatedAt: payroll.updatedAt,
    };
  }
}
