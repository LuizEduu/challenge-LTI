import { UserBenefits } from '../../enterprise/entities/user-benefits';

export abstract class UsersBenefitsRepository {
  abstract findByBenefitId(id: string): Promise<UserBenefits[]>;
}
