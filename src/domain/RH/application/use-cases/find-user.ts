import { Injectable } from '@nestjs/common';
import { User } from '../../enterprise/entities/user';
import { Either, left, right } from '@/core/either';
import { UsersRepository } from '../repositories/users-repository';
import { UserNotFoundError } from './errors/user-not-found-error';

type FindUserUseCaseRequest = {
  id: string;
};

type FindUserUseCaseResponse = Either<
  UserNotFoundError,
  {
    user: User;
  }
>;

@Injectable()
export class FindUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: FindUserUseCaseRequest): Promise<FindUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      return left(new UserNotFoundError());
    }

    return right({
      user,
    });
  }
}
