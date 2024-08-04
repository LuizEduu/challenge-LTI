import { Benefit } from '../../enterprise/entities/benefit';
import { UserBenefits } from '../../enterprise/entities/user-benefits';

export abstract class UsersBenefitsRepository {
  abstract findByBenefitId(id: string): Promise<UserBenefits[]>;
  abstract create(userBenefits: UserBenefits[]): Promise<void>;
  abstract findManyByUserId(userId: string): Promise<Benefit[]>;
}
