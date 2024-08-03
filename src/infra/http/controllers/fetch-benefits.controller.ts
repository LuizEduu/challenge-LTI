import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { FetchBenefitsUseCase } from '@/domain/RH/application/use-cases/fetch-benefits';
import { HttpBenefitsPresenter } from '../presenters/http-benefits-presenter';

const fetchBenefitsQuerySchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  createdAt: z.string().optional(),
});

type FetchBenefitsQuerySchema = z.infer<typeof fetchBenefitsQuerySchema>;

@Controller('/benefits')
export class FetchBenefitsController {
  constructor(private useCase: FetchBenefitsUseCase) {}

  @UsePipes(new ZodValidationPipe(fetchBenefitsQuerySchema))
  @Get()
  async handle(
    @Query() { id, name, description, createdAt }: FetchBenefitsQuerySchema,
  ) {
    const result = await this.useCase.execute({
      id,
      name,
      description,
      createdAt,
    });

    return {
      benefits: result.value?.benefits.map(HttpBenefitsPresenter.toHTTP),
    };
  }
}
