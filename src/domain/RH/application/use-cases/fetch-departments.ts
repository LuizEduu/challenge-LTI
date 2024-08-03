import { Injectable } from '@nestjs/common';
import { Either, right } from '@/core/either';
import { DepartmentsRepository } from '../repositories/departments-repository';
import { Department } from '../../enterprise/entities/departments';

type FetchDepartmentsUseCaseRequest = {
  id?: string;
  name?: string;
  managerId?: string;
  createdAt?: string;
};

type FetchDepartmentsUseCaseResponse = Either<
  null,
  {
    departments: Department[];
  }
>;

@Injectable()
export class FetchDepartmentsUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    id,
    name,
    managerId,
    createdAt,
  }: FetchDepartmentsUseCaseRequest): Promise<FetchDepartmentsUseCaseResponse> {
    const departments = await this.departmentsRepository.fetchByParams({
      id,
      name,
      managerId,
      createdAt: createdAt ? new Date(createdAt) : undefined,
    });

    return right({
      departments,
    });
  }
}
