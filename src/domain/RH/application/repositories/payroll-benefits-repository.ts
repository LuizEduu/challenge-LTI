import { PayrollBenefits } from '../../enterprise/entities/payroll-benefits';

export abstract class PayrollBenefitsRepository {
  abstract create(payrollBenefits: PayrollBenefits[]): Promise<void>;
}
