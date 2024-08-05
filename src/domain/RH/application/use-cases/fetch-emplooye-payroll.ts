import { Injectable } from '@nestjs/common';
import { PayrollRepository } from '../repositories/payroll-repository';
import { Either, right } from '@/core/either';
import { PayrollReport } from '../../enterprise/entities/value-objects/payroll report';
import { UsersRepository } from '../repositories/users-repository';
import { Role } from '../../enterprise/entities/user';
import { UsersDepartmentsRepository } from '../repositories/users-departments-repository';
import { UserDepartments } from '../../enterprise/entities/user-departments';

export type FetchEmplooyePayrollUseCaseRequest = {
  departmentIds?: string;
  initialPeriod?: Date;
  lastPeriod?: Date;
  userId: string;
};

export type FetchEmplooyeePayrollUseCaseResponse = Either<
  null,
  {
    payrollReports: PayrollReport[];
  }
>;

@Injectable()
export class FetchEmplooyePayrollUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private payrollRepository: PayrollRepository,
    private usersDepartmentsRepository: UsersDepartmentsRepository,
  ) {}

  async execute({
    userId,
    departmentIds,
    initialPeriod,
    lastPeriod,
  }: FetchEmplooyePayrollUseCaseRequest): Promise<FetchEmplooyeePayrollUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);
    let userDepartments: UserDepartments[] = [];

    if (user?.role?.toLowerCase() === Role.manager && !departmentIds?.length) {
      userDepartments = await this.usersDepartmentsRepository.findManyByUserId(
        user?.id.toString(),
      );
    }

    const departmentsFilterConditions =
      user?.role.toLowerCase() === Role.manager.toLowerCase() &&
      !departmentIds?.length
        ? userDepartments.map((ud) => ud.departmentId.toString())
        : departmentIds?.split(',');

    const payrollReports = await this.payrollRepository.fetchPayrollReports({
      departmentIds: departmentsFilterConditions,
      initialPeriod,
      lastPeriod,
      userId: user?.role.toLowerCase() === Role.employee ? userId : undefined,
    });

    return right({
      payrollReports,
    });
  }
}
