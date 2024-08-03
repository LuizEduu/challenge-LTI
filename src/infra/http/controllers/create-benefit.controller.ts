import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { z } from 'zod';
import { CreateBenefitUseCase } from '@/domain/RH/application/use-cases/create-benefit';
import { BenefitAlreadyExistsError } from '@/domain/RH/application/use-cases/errors/benefit-already-exists-error';
import { HttpBenefitsPresenter } from '../presenters/http-benefits-presenter';

const createBenefitBodySchema = z.object({
  name: z.string(),
  description: z.string(),
});

type CreateBenefitBodySchema = z.infer<typeof createBenefitBodySchema>;

@Controller('/benefits')
export class CreateBenefitController {
  constructor(private useCase: CreateBenefitUseCase) {}

  @UsePipes(new ZodValidationPipe(createBenefitBodySchema))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() body: CreateBenefitBodySchema) {
    const { name, description } = body;

    const result = await this.useCase.execute({
      name,
      description,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case BenefitAlreadyExistsError:
          throw new ConflictException();
        default:
          throw new BadRequestException();
      }
    }

    return {
      benefit: HttpBenefitsPresenter.toHTTP(result.value.benefit),
    };
  }
}
