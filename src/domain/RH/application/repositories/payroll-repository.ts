import { Payroll } from '../../enterprise/entities/payroll';

type findByPeriodParams = {
  firstPeriod: Date;
  lastPeriod: Date;
};

export abstract class PayrollRepository {
  abstract findByPeriod(params: findByPeriodParams): Promise<Payroll>;
  abstract create(payroll: Payroll): Promise<void>;
}
