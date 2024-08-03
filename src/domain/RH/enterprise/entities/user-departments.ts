import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export type UserDeparmentsProps = {
  userId: UniqueEntityID;
  departmentId: UniqueEntityID;
  createdAt?: Date | null | undefined;
};

export class UserDepartments extends Entity<UserDeparmentsProps> {
  get userId() {
    return this.props.userId;
  }

  set userId(userId: UniqueEntityID) {
    this.props.userId = userId;
  }

  get departmentId() {
    return this.props.departmentId;
  }

  set departmentId(departmentId: UniqueEntityID) {
    this.props.departmentId = departmentId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(
    props: Optional<UserDeparmentsProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    return new UserDepartments(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }
}
