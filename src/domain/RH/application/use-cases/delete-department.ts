import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/core/either';
import { DepartmentNotFoundError } from './errors/department-not-found';
import { DepartmentsRepository } from '../repositories/departments-repository';
import { UsersDepartmentsRepository } from '../repositories/users-departments-repository';
import { NotAuthorizedError } from './errors/not-authorized-error';

type DeleteDepartmentUseCaseRequest = {
  id: string;
  userId: string;
};

type DeleteDepartmentUseCaseResponse = Either<
  DepartmentNotFoundError | NotAuthorizedError,
  null
>;

@Injectable()
export class DeleteDepartmentUseCase {
  constructor(
    private departmentsRepository: DepartmentsRepository,
    private userDepartmentsRepository: UsersDepartmentsRepository,
  ) {}

  async execute({
    id,
    userId,
  }: DeleteDepartmentUseCaseRequest): Promise<DeleteDepartmentUseCaseResponse> {
    const [department, userDepartments] = await Promise.all([
      await this.departmentsRepository.findById(id),
      this.userDepartmentsRepository.findByDepartmentId(id),
    ]);

    if (!department) {
      return left(new DepartmentNotFoundError());
    }

    if (userDepartments.length) {
      return left(new NotAuthorizedError());
    }

    if (department.managerId.toString() !== userId) {
      return left(new NotAuthorizedError());
    }

    await this.departmentsRepository.delete(department.id.toString());

    return right(null);
  }
}
