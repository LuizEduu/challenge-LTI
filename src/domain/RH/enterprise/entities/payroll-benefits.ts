import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export type PayrollBenefitsProps = {
  payrollId: UniqueEntityID;
  benefitId: UniqueEntityID;
  createdAt?: Date | undefined;
};

export class PayrollBenefits extends Entity<PayrollBenefitsProps> {
  get payrollId() {
    return this.props.payrollId;
  }

  set payrollId(payrollId: UniqueEntityID) {
    this.props.payrollId = payrollId;
  }

  get benefitId() {
    return this.props.benefitId;
  }

  set benefitId(benefitId: UniqueEntityID) {
    this.props.benefitId = benefitId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(
    props: Optional<PayrollBenefitsProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    return new PayrollBenefits(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }
}
