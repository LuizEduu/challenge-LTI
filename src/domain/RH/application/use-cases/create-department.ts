import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/core/either';
import { UsersRepository } from '../repositories/users-repository';
import { DepartmentAlreadyExistsError } from './errors/department-already-exists';
import { UserNotFoundError } from './errors/user-not-found-error';
import { Department } from '../../enterprise/entities/departments';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DepartmentsRepository } from '../repositories/departments-repository';

type CreateDepartmentUseCaseRequest = {
  name: string;
  managerId: string;
};

type CreateDepartmentUseCaseResponse = Either<
  DepartmentAlreadyExistsError | UserNotFoundError,
  {
    department: Department;
  }
>;

@Injectable()
export class CreateDepartmentUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private departmentsRepository: DepartmentsRepository,
  ) {}

  async execute({
    name,
    managerId,
  }: CreateDepartmentUseCaseRequest): Promise<CreateDepartmentUseCaseResponse> {
    const user = await this.usersRepository.findById(managerId);

    if (!user) {
      return left(new UserNotFoundError());
    }

    const departmentAlreadyExists =
      await this.departmentsRepository.findByName(name);

    if (departmentAlreadyExists) {
      return left(new DepartmentAlreadyExistsError());
    }

    const department = Department.create({
      name,
      managerId: new UniqueEntityID(managerId),
    });

    await this.departmentsRepository.create(department);

    return right({
      department,
    });
  }
}
