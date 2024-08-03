import { Department } from '../../enterprise/entities/departments';

export type fetchByParamsRequest = {
  id?: string;
  name?: string;
  managerId?: string;
  createdAt?: Date;
};

export abstract class DepartmentsRepository {
  abstract findByName(name: string): Promise<Department | null>;
  abstract create(deparment: Department): Promise<void>;
  abstract fetchByParams(params: fetchByParamsRequest): Promise<Department[]>;
  abstract findById(id: string): Promise<Department | null>;
  abstract update(department: Department): Promise<void>;
}
