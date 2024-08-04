import { ValueObject } from '@/core/entities/value-object';

export type UserBenefitsWithBenefitsFieldsProps = {
  userId: string;
  benefitId: string;
  value: number;
};

export class UserBenefitsWithBenefitsFields extends ValueObject<UserBenefitsWithBenefitsFieldsProps> {
  get userId() {
    return this.props.userId;
  }

  get benefitId() {
    return this.props.benefitId;
  }

  get value() {
    return this.props.value;
  }

  static create(props: UserBenefitsWithBenefitsFieldsProps) {
    return new UserBenefitsWithBenefitsFields(props);
  }
}
