import { User } from '../../enterprise/entities/user';
import { UserWithDepartmentsAndBenefits } from '../../enterprise/entities/value-objects/user-with-departments-and-benefits';

export type fetchByParamsRequest = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt?: Date;
};

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
  abstract fetchByParams(
    params: fetchByParamsRequest,
  ): Promise<UserWithDepartmentsAndBenefits[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract delete(id: string): Promise<void>;
  abstract update(user: User): Promise<void>;
}
