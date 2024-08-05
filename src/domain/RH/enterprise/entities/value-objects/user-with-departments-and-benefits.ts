import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ValueObject } from '@/core/entities/value-object';

export type UserWithDepartmentsAndBenefitsProps = {
  userId: UniqueEntityID;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  departments: {
    id: UniqueEntityID;
    name: string;
    managerId: UniqueEntityID;
  }[];
  benefits: {
    id: UniqueEntityID;
    name: string;
    description: string;
  }[];
};

export class UserWithDepartmentsAndBenefits extends ValueObject<UserWithDepartmentsAndBenefitsProps> {
  get userId() {
    return this.props.userId;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get role() {
    return this.props.role;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get departments() {
    return this.props.departments;
  }

  get benefits() {
    return this.props.benefits;
  }

  static create(props: UserWithDepartmentsAndBenefitsProps) {
    return new UserWithDepartmentsAndBenefits(props);
  }
}
