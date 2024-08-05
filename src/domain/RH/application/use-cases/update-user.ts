import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/core/either';
import { UsersRepository } from '../repositories/users-repository';
import { UserNotFoundError } from './errors/user-not-found-error';
import { HashGenerator } from '../cryptography/hash-generator';
import { User } from '../../enterprise/entities/user';

type UpdateUserUseCaseRequest = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  departmentsIds?: string[];
  benefitsIds?: string[];
};

type UpdateUserUseCaseResponse = Either<
  UserNotFoundError,
  {
    user: User;
  }
>;

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGeneartor: HashGenerator,
  ) {}

  async execute({
    id,
    name,
    email,
    password,
    role,
    departmentsIds,
    benefitsIds,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      return left(new UserNotFoundError());
    }

    user.name = name;
    user.email = email;
    user.role = role;

    if (password) {
      user.password = await this.hashGeneartor.hash(password);
    }

    if (departmentsIds?.length) {
      user.departmentsIds = departmentsIds;
    }

    if (benefitsIds) {
      user.benefitsIds = benefitsIds;
    }

    user.updatedAt = new Date();

    await this.usersRepository.update(user);

    return right({
      user,
    });
  }
}
