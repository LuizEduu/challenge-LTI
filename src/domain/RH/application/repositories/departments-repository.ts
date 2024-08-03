import { Department } from '../../enterprise/entities/departments';

export abstract class DepartmentsRepository {
  abstract findByName(name: string): Promise<Department | null>;
  abstract create(deparment: Department): Promise<void>;
}
