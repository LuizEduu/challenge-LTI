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
  role: string;
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

  set email(email: string) {
    this.props.email = email;
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get role() {
    return this.props.role;
  }

  set role(role: string) {
    this.props.role = role;
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
    props: Optional<UserProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    return new User(
      {
        ...props,
        role: props.role ?? Role.employee,
      },
      id,
    );
  }
}
