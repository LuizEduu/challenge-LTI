import { UserBenefits } from '../../enterprise/entities/user-benefits';
import { UserBenefitsWithBenefitsFields } from '../../enterprise/entities/value-objects/user-benefits-with-benefit-fields';

export abstract class UsersBenefitsRepository {
  abstract findByBenefitId(id: string): Promise<UserBenefits[]>;
  abstract create(userBenefits: UserBenefits[]): Promise<void>;
  abstract findManyByUserId(
    userId: string,
  ): Promise<UserBenefitsWithBenefitsFields[]>;
}
