import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { z } from 'zod';
import { HttpUserPresenter } from '../presenters/http-users-presenter';
import { FindUserUseCase } from '@/domain/RH/application/use-cases/find-user';
import { UserNotFoundError } from '@/domain/RH/application/use-cases/errors/user-not-found-error';

const findAccountParamsSchema = z.object({
  id: z.string(),
});

type FindAccountParamsSchema = z.infer<typeof findAccountParamsSchema>;

@Controller('/users/:id')
export class FindAccountController {
  constructor(private useCase: FindUserUseCase) {}

  @Get()
  async handle(
    @Param(new ZodValidationPipe(findAccountParamsSchema))
    { id }: FindAccountParamsSchema,
  ) {
    const result = await this.useCase.execute({
      id,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case UserNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    return {
      user: HttpUserPresenter.toHTTP(result.value.user),
    };
  }
}
