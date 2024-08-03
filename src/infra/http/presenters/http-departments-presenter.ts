import { Department } from '@/domain/RH/enterprise/entities/departments';

export class HttpDepartmentsPresenter {
  static toHTTP(department: Department) {
    return {
      id: department.id.toString(),
      name: department.name,
      managerId: department.managerId.toString(),
      createdAt: department.createdAt,
      updatedAt: department.updatedAt,
    };
  }
}
