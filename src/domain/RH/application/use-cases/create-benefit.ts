import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/core/either';
import { Benefit } from '../../enterprise/entities/benefit';
import { BenefitAlreadyExistsError } from './errors/benefit-already-exists-error';
import { BenefitsRepository } from '../repositories/benefits-repository';

type CreateBenefitUseCaseRequest = {
  name: string;
  description: string;
  value: number;
};

type CreateBenefitUseCaseResponse = Either<
  BenefitAlreadyExistsError,
  {
    benefit: Benefit;
  }
>;

@Injectable()
export class CreateBenefitUseCase {
  constructor(private benefitsRepository: BenefitsRepository) {}

  async execute({
    name,
    description,
    value,
  }: CreateBenefitUseCaseRequest): Promise<CreateBenefitUseCaseResponse> {
    const benefitAlreadyExists = await this.benefitsRepository.findByName(name);

    if (benefitAlreadyExists) {
      return left(new BenefitAlreadyExistsError());
    }

    const benefit = Benefit.create({
      name,
      description,
      value: value,
    });

    await this.benefitsRepository.create(benefit);

    return right({
      benefit,
    });
  }
}
