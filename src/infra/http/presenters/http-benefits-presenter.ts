import { Benefit } from '@/domain/RH/enterprise/entities/benefit';

export class HttpBenefitsPresenter {
  static toHTTP(benefit: Benefit) {
    return {
      id: benefit.id.toString(),
      name: benefit.name,
      description: benefit.description,
      createdAt: benefit.createdAt,
      updatedAt: benefit.updatedAt,
    };
  }
}
