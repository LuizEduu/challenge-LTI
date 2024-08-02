import { Optional } from '@/core/types/optional';
import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export enum Role {
  employee = 'employee',
  manager = 'manager',
}

export type UserProps = {
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get email() {
    return this.props.email;
  }

  set email(name: string) {
    this.props.name = name;
  }

  get password() {
    return this.props.password;
  }

  set password(name: string) {
    this.props.name = name;
  }

  get role() {
    return this.props.role;
  }

  set role(name: string) {
    this.props.name = name;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<UserProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    return new User(
      {
        ...props,
        role: props.role ?? Role.Employee,
      },
      id,
    );
  }
}
