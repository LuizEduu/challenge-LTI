import { Either, left, right } from '@/core/either';
import { Payroll } from '../../enterprise/entities/payroll';
import { UsersBenefitsRepository } from '../repositories/users-benefits-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { PayrollRepository } from '../repositories/payroll-repository';
import { PayrollInPeriodAlreadyExistsError } from './errors/payroll-in-period-already-exists-error';

export type CreatePayrollUseCaseRequest = {
  name: string;
  firstPeriod: Date;
  lastPeriod: Date;
  departmentId: string;
  month: string;
  year: string;
  hoursWorked: number;
  hourValue: number;
  employeeId: string;
};

export type CreatePayrollUseCaseResponse = Either<
  PayrollInPeriodAlreadyExistsError,
  {
    payroll: Payroll;
  }
>;

export class CreatePayrollUseCase {
  constructor(
    private payrollRepository: PayrollRepository,
    private userBenefitsRepository: UsersBenefitsRepository,
  ) {}

  async execute({
    name,
    firstPeriod,
    lastPeriod,
    departmentId,
    month,
    year,
    employeeId,
    hoursWorked,
    hourValue,
  }: CreatePayrollUseCaseRequest): Promise<CreatePayrollUseCaseResponse> {
    const payrollWithPeriodExists = await this.payrollRepository.findByPeriod({
      firstPeriod,
      lastPeriod,
    });
    if (payrollWithPeriodExists) {
      return left(new PayrollInPeriodAlreadyExistsError());
    }

    const userBenefits =
      await this.userBenefitsRepository.findManyByUserId(employeeId);

    const userBenefitsTotalValue = userBenefits.reduce(
      (acc, cv) => acc + Number(cv.value),
      0,
    );

    const totalPayment = hoursWorked * hourValue + userBenefitsTotalValue;

    const payroll = Payroll.create({
      name,
      month,
      year,
      firstPeriod,
      lastPeriod,
      totalPayment,
      departmentId: departmentId ? new UniqueEntityID(departmentId) : null,
    });

    await this.payrollRepository.create(payroll);

    return right({
      payroll,
    });
  }
}
