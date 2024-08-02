import { Injectable } from '@nestjs/common';
import { Role, User } from '../../enterprise/entities/user';
import { Either, left, right } from '@/core/either';
import { UserAlreadyExistsError } from './errors/user-already-exists';
import { UsersRepository } from '../repositories/users-repository';
import { HashGenerator } from '../cryptography/hash-generator';

type CreateUserUseCaseRequest = {
  name: string;
  email: string;
  password: string;
  role: string;
};

type CreateUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User;
  }
>;

@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
    role,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
      role: Role[],
    });

    await this.usersRepository.create(user);

    return right({
      user,
    });
  }
}
