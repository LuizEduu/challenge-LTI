import { Benefit } from '../../enterprise/entities/benefit';

export abstract class BenefitsRepository {
  abstract create(benefit: Benefit): Promise<void>;
  abstract findByName(name: string): Promise<Benefit | null>;
}
