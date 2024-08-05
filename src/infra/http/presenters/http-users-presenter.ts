import { User } from '@/domain/RH/enterprise/entities/user';
import { UserWithDepartmentsAndBenefits } from '@/domain/RH/enterprise/entities/value-objects/user-with-departments-and-benefits';

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

  static toHTTPUsersWithDepartmentsAndBenefits(
    user: UserWithDepartmentsAndBenefits,
  ) {
    return {
      userId: user.userId.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      departments: user.departments.map((department) => ({
        departmentId: department.id.toString(),
        name: department.name,
        managerId: department.managerId.toString(),
      })),
      benefits: user.benefits.map((benefit) => ({
        benefitId: benefit.id.toString(),
        name: benefit.name,
        description: benefit.description,
      })),
    };
  }
}
