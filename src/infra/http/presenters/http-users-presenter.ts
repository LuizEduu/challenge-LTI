import { User } from '@/domain/RH/enterprise/entities/user';

export class HttpUserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      departments: user.userDepartments.map((department) => ({
        departmentId: department.id.toString(),
        createdAt: department.createdAt,
      })),
    };
  }
}
