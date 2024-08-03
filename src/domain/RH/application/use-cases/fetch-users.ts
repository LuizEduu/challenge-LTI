import { Injectable } from '@nestjs/common';
import { User } from '../../enterprise/entities/user';
import { Either, right } from '@/core/either';
import { UsersRepository } from '../repositories/users-repository';

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
    users: User[];
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

    console.log(users);

    return right({
      users,
    });
  }
}
