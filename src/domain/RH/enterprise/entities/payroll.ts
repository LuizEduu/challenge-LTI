import { Optional } from '@/core/types/optional';
import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export type PayrollProps = {
  name: string;
  firstPeriod: Date;
  lastPeriod: Date;
  month: number;
  year: number;
  departmentId: UniqueEntityID;
  totalPayment: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export class Payroll extends Entity<PayrollProps> {
  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get firstPeriod() {
    return this.props.firstPeriod;
  }

  set firstPeriod(firstPeriod: Date) {
    this.props.firstPeriod = firstPeriod;
  }

  get lastPeriod() {
    return this.props.lastPeriod;
  }

  set lastPeriod(lastPeriod: Date) {
    this.props.lastPeriod = lastPeriod;
  }

  get month() {
    return this.props.month;
  }

  set month(month: number) {
    this.props.month = month;
  }

  get year() {
    return this.props.year;
  }

  set year(year: number) {
    this.props.year = year;
  }

  get departmentId(): UniqueEntityID {
    return this.props.departmentId;
  }

  set departmentId(departmentId: UniqueEntityID) {
    this.props.departmentId = departmentId;
  }

  get totalPayment() {
    return this.props.totalPayment;
  }

  set totalPayment(totalPayment: number) {
    this.props.totalPayment = totalPayment;
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
    props: Optional<PayrollProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    return new Payroll(
      {
        ...props,
      },
      id,
    );
  }
}
