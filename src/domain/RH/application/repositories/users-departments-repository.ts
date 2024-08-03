import { UserDepartments } from '../../enterprise/entities/user-departments';

export abstract class UsersDepartmentsRepository {
  abstract create(userDepartments: UserDepartments[]): Promise<void>;
}
