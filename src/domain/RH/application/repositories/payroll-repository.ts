import { Payroll } from '../../enterprise/entities/payroll';
import { PayrollReport } from '../../enterprise/entities/value-objects/payroll report';

export type findByPeriodParams = {
  firstPeriod: Date;
  lastPeriod: Date;
  userId: string;
};

export type fetchPayrollReportsParams = {
  departmentIds?: string[];
  initialPeriod?: Date;
  lastPeriod?: Date;
  userId: string | undefined;
};

export abstract class PayrollRepository {
  abstract findByPeriod(params: findByPeriodParams): Promise<Payroll | null>;
  abstract create(payroll: Payroll): Promise<void>;
  abstract fetchPayrollReports(
    params: fetchPayrollReportsParams,
  ): Promise<PayrollReport[]>;
}
