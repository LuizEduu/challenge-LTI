import { Benefit } from '../../enterprise/entities/benefit';

export type fetchByParamsRequest = {
  id?: string;
  name?: string;
  description?: string;
  createdAt?: Date;
};

export abstract class BenefitsRepository {
  abstract create(benefit: Benefit): Promise<void>;
  abstract findByName(name: string): Promise<Benefit | null>;
  abstract fetchByParams(params: fetchByParamsRequest): Promise<Benefit[]>;
}
