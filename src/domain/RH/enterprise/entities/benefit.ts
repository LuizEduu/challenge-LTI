import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

type BenefitProps = {
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Benefit extends Entity<BenefitProps> {
  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<BenefitProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    return new Benefit(props, id);
  }
}