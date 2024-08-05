import { Payroll } from '@/domain/RH/enterprise/entities/payroll';
import { PayrollReport } from '@/domain/RH/enterprise/entities/value-objects/payroll report';

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

  static toHTTPPayrollReport(payrollReport: PayrollReport) {
    return {
      emplooyeName: payrollReport.emplooyeName,
      employeEmail: payrollReport.emplooyeEmail,
      firstPeriod: payrollReport.firstPeriod,
      lastPeriod: payrollReport.lastPeriod,
      month: payrollReport.month,
      year: payrollReport.year,
      departmentId: payrollReport.departmentId.toString(),
      totalPayment: payrollReport.totalPayment,
      emplooyeId: payrollReport.emplooyeId.toString(),
      benefits: payrollReport.benefits,
    };
  }
}
