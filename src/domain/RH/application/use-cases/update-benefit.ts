import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/core/either';
import { BenefitNotFoundError } from './errors/benefit-not-found-error';
import { Benefit } from '../../enterprise/entities/benefit';
import { BenefitsRepository } from '../repositories/benefits-repository';

type UpdateBenefitUseCaseRequest = {
  id: string;
  name?: string;
  description?: string;
};

type UpdateBenefitUseCaseResponse = Either<
  BenefitNotFoundError,
  {
    benefit: Benefit;
  }
>;

@Injectable()
export class UpdateBenefitUseCase {
  constructor(private benefitsRepository: BenefitsRepository) {}

  async execute({
    id,
    name,
    description,
  }: UpdateBenefitUseCaseRequest): Promise<UpdateBenefitUseCaseResponse> {
    const benefit = await this.benefitsRepository.findById(id);

    if (!benefit) {
      return left(new BenefitNotFoundError());
    }

    benefit.name = name ? name : benefit.name;
    benefit.description = description ? description : benefit.name;
    benefit.updatedAt = new Date();

    await this.benefitsRepository.update(benefit);

    return right({
      benefit,
    });
  }
}
