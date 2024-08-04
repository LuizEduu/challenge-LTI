import { Payroll } from '../../enterprise/entities/payroll';

export type findByPeriodParams = {
  firstPeriod: Date;
  lastPeriod: Date;
  userId: string;
};

export abstract class PayrollRepository {
  abstract findByPeriod(params: findByPeriodParams): Promise<Payroll | null>;
  abstract create(payroll: Payroll): Promise<void>;
}
