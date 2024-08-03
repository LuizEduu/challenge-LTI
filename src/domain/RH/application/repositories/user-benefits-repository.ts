import { UserBenefits } from '../../enterprise/entities/user-benefits';

export abstract class UserBenefitsRepository {
  abstract findByBenefitId(id: string): Promise<UserBenefits[]>;
}
