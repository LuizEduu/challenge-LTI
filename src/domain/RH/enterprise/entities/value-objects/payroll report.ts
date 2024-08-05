import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ValueObject } from '@/core/entities/value-object';

type BenefitProps = {
  name: string;
  value: number;
};

export type PayrollReportProps = {
  emplooyeName: string;
  employeEmail: string;
  firstPeriod: Date;
  lastPeriod: Date;
  month: number;
  year: number;
  departmentId: UniqueEntityID;
  totalPayment: number;
  emplooyeId: UniqueEntityID;
  benefits: BenefitProps[];
};

export class PayrollReport extends ValueObject<PayrollReportProps> {
  get emplooyeName(): string {
    return this.props.emplooyeName;
  }

  get emplooyeEmail(): string {
    return this.props.employeEmail;
  }

  get firstPeriod(): Date {
    return this.props.firstPeriod;
  }

  get lastPeriod(): Date {
    return this.props.lastPeriod;
  }

  get month(): number {
    return this.props.month;
  }

  get year(): number {
    return this.props.year;
  }

  get departmentId(): UniqueEntityID {
    return this.props.departmentId;
  }

  get totalPayment(): number {
    return this.props.totalPayment;
  }

  get emplooyeId(): UniqueEntityID {
    return this.props.emplooyeId;
  }

  get benefits(): BenefitProps[] {
    return this.props.benefits;
  }

  static create(props: PayrollReportProps) {
    return new PayrollReport(props);
  }
}
