import { UserDepartments } from '../../enterprise/entities/user-departments';

export abstract class UsersDepartmentsRepository {
  abstract create(userDepartments: UserDepartments[]): Promise<void>;
  abstract findByDepartmentId(departmentId: string): Promise<UserDepartments[]>;
  abstract findManyByUserId(userId: string): Promise<UserDepartments[]>;
  abstract update(userDepartments: UserDepartments[]): Promise<void>;
}
