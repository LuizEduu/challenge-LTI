import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export type UserBenefitsProps = {
  userId: UniqueEntityID;
  benefitId: UniqueEntityID;
  createdAt?: Date | null | undefined;
};

export class UserBenefits extends Entity<UserBenefitsProps> {
  get userId() {
    return this.props.userId;
  }

  set userId(userId: UniqueEntityID) {
    this.props.userId = userId;
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
    props: Optional<UserBenefitsProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    return new UserBenefits(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }
}
