import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { z } from 'zod';
import { DeleteBenefitUseCase } from '@/domain/RH/application/use-cases/delete-benefit';
import { BenefitNotFoundError } from '@/domain/RH/application/use-cases/errors/benefit-not-found-error';
import { NotAuthorizedError } from '@/domain/RH/application/use-cases/errors/not-authorized-error';

const deleteBenefitParamsSchema = z.object({
  id: z.string(),
});

type DeleteBenefitParamsSchema = z.infer<typeof deleteBenefitParamsSchema>;

@Controller('/benefits/:id')
export class DeleteBenefitController {
  constructor(private useCase: DeleteBenefitUseCase) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @Param(new ZodValidationPipe(deleteBenefitParamsSchema))
    { id }: DeleteBenefitParamsSchema,
  ) {
    const result = await this.useCase.execute({
      id,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case BenefitNotFoundError:
          throw new NotFoundException(error.message);
        case NotAuthorizedError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
