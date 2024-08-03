import { Optional } from '@/core/types/optional';
import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { UserDepartments } from './user-departments';

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
  departmentsIds: string[];
  userDepartments: UserDepartments[];
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

  get departmentsIds() {
    return this.props.departmentsIds;
  }

  set departmentsIds(departmentsIds: string[]) {
    this.props.departmentsIds = departmentsIds;
  }

  get userDepartments() {
    return this.props.userDepartments;
  }

  static create(
    props: Optional<
      UserProps,
      'createdAt' | 'updatedAt' | 'departmentsIds' | 'userDepartments'
    >,
    id?: UniqueEntityID,
  ) {
    return new User(
      {
        ...props,
        role: props.role ?? Role.employee,
        departmentsIds: props.departmentsIds ?? [],
        userDepartments: props.userDepartments ?? [],
      },
      id,
    );
  }
}
