import { User } from '../../enterprise/entities/user';

export type findByParamsRequest = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt?: Date;
};

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
  abstract fetchByParams(params: findByParamsRequest): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
}
