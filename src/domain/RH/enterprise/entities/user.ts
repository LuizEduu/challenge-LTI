import { Optional } from '@/core/types/optional';
import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { UserDepartments } from './user-departments';
import { UserBenefits } from './user-benefits';

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
  benefitsIds: string[];
  userBenefits: UserBenefits[];
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

  get benefitsIds() {
    return this.props.benefitsIds;
  }

  set benefitsIds(benefitsIds: string[]) {
    this.props.benefitsIds = benefitsIds;
  }

  get userBenefits() {
    return this.props.userBenefits;
  }

  static create(
    props: Optional<
      UserProps,
      | 'createdAt'
      | 'updatedAt'
      | 'departmentsIds'
      | 'userDepartments'
      | 'benefitsIds'
      | 'userBenefits'
    >,
    id?: UniqueEntityID,
  ) {
    return new User(
      {
        ...props,
        role: props.role ?? Role.employee,
        departmentsIds: props.departmentsIds ?? [],
        userDepartments: props.userDepartments ?? [],
        benefitsIds: props.benefitsIds ?? [],
        userBenefits: props.userBenefits ?? [],
      },
      id,
    );
  }
}
