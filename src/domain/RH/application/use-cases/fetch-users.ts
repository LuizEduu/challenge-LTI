import { Injectable } from '@nestjs/common';
import { Either, right } from '@/core/either';
import { UsersRepository } from '../repositories/users-repository';
import { UserWithDepartmentsAndBenefits } from '../../enterprise/entities/value-objects/user-with-departments-and-benefits';

type FetchUsersUseCaseRequest = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt?: string;
};

type FetchUsersUseCaseResponse = Either<
  null,
  {
    users: UserWithDepartmentsAndBenefits[];
  }
>;

@Injectable()
export class FetchUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    name,
    email,
    role,
    createdAt,
  }: FetchUsersUseCaseRequest): Promise<FetchUsersUseCaseResponse> {
    const users = await this.usersRepository.fetchByParams({
      id,
      email,
      name,
      role,
      createdAt: createdAt ? new Date(createdAt) : undefined,
    });

    return right({
      users,
    });
  }
}
