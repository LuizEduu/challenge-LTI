import { Injectable } from '@nestjs/common';
import { Either, right } from '@/core/either';
import { Benefit } from '../../enterprise/entities/benefit';
import { BenefitsRepository } from '../repositories/benefits-repository';

type FetchBenefitsUseCaseRequest = {
  id?: string;
  name?: string;
  description?: string;
  createdAt?: string;
};

type FetchBenefitsUseCaseResponse = Either<
  null,
  {
    benefits: Benefit[];
  }
>;

@Injectable()
export class FetchBenefitsUseCase {
  constructor(private benefitsRepository: BenefitsRepository) {}

  async execute({
    id,
    name,
    description,
    createdAt,
  }: FetchBenefitsUseCaseRequest): Promise<FetchBenefitsUseCaseResponse> {
    const benefits = await this.benefitsRepository.fetchByParams({
      id,
      name,
      description,
      createdAt: createdAt ? new Date(createdAt) : undefined,
    });

    return right({
      benefits,
    });
  }
}
