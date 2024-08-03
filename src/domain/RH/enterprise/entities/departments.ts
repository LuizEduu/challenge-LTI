import { Optional } from '@/core/types/optional';
import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export type DepartmentsProps = {
  name: string;
  managerId: UniqueEntityID;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export class Department extends Entity<DepartmentsProps> {
  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get managerId() {
    return this.props.managerId;
  }

  set managerId(managerId: UniqueEntityID) {
    this.props.managerId = managerId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  static create(
    props: Optional<DepartmentsProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    return new Department(
      {
        ...props,
      },
      id,
    );
  }
}
