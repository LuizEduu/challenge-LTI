import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/core/either';
import { Department } from '../../enterprise/entities/departments';
import { DepartmentNotFoundError } from './errors/department-not-found';
import { DepartmentsRepository } from '../repositories/departments-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAuthorizedError } from './errors/not-authorized-error';

type UpdateDepartmentUseCaseRequest = {
  id: string;
  name?: string;
  managerId?: string;
  userId: string;
};

type UpdateDepartmentUseCaseResponse = Either<
  DepartmentNotFoundError | NotAuthorizedError,
  {
    department: Department;
  }
>;

@Injectable()
export class UpdateDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    id,
    name,
    managerId,
    userId,
  }: UpdateDepartmentUseCaseRequest): Promise<UpdateDepartmentUseCaseResponse> {
    const department = await this.departmentsRepository.findById(id);

    if (!department) {
      return left(new DepartmentNotFoundError());
    }

    if (userId !== department?.managerId.toString()) {
      return left(new NotAuthorizedError());
    }

    department.managerId = managerId
      ? new UniqueEntityID(managerId)
      : department.managerId;

    department.name = name ? name : department.name;

    department.updatedAt = new Date();

    await this.departmentsRepository.update(department);

    return right({
      department,
    });
  }
}
