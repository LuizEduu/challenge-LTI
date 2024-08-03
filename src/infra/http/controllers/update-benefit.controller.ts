import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { UpdateBenefitUseCase } from '@/domain/RH/application/use-cases/update-benefit';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { HttpBenefitsPresenter } from '../presenters/http-benefits-presenter';
import { BenefitNotFoundError } from '@/domain/RH/application/use-cases/errors/benefit-not-found-error';

const updateBenefitBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

const updateBenefitParamsSchema = z.object({
  id: z.string(),
});

type UpdateBenefitBodySchema = z.infer<typeof updateBenefitBodySchema>;
type UpdateBenefitParamsSchema = z.infer<typeof updateBenefitParamsSchema>;

@Controller('/benefits/:id')
export class UpdateBenefitController {
  constructor(private useCase: UpdateBenefitUseCase) {}

  @UsePipes()
  @Put()
  async handle(
    @Body(new ZodValidationPipe(updateBenefitBodySchema))
    body: UpdateBenefitBodySchema,
    @Param(new ZodValidationPipe(updateBenefitParamsSchema))
    { id }: UpdateBenefitParamsSchema,
  ) {
    const { name, description } = body;

    const result = await this.useCase.execute({
      id,
      name,
      description,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case BenefitNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException();
      }
    }

    return {
      benefit: HttpBenefitsPresenter.toHTTP(result.value.benefit),
    };
  }
}
