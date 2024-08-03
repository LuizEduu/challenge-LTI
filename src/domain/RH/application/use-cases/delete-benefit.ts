import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/core/either';
import { BenefitNotFoundError } from './errors/benefit-not-found-error';
import { BenefitsRepository } from '../repositories/benefits-repository';
import { NotAuthorizedError } from './errors/not-authorized-error';
import { UserBenefitsRepository } from '../repositories/user-benefits-repository';

type DeleteBenefitUseCaseRequest = {
  id: string;
};

type DeleteBenefitUseCaseResponse = Either<BenefitNotFoundError, null>;

@Injectable()
export class DeleteBenefitUseCase {
  constructor(
    private benefitsRepository: BenefitsRepository,
    private userBenefitsRepository: UserBenefitsRepository,
  ) {}

  async execute({
    id,
  }: DeleteBenefitUseCaseRequest): Promise<DeleteBenefitUseCaseResponse> {
    const [benefit, userBenefits] = await Promise.all([
      this.benefitsRepository.findById(id),
      this.userBenefitsRepository.findByBenefitId(id),
    ]);

    if (!benefit) {
      return left(new BenefitNotFoundError());
    }

    if (userBenefits.length) {
      return left(new NotAuthorizedError());
    }

    await this.benefitsRepository.delete(benefit.id.toString());

    return right(null);
  }
}
