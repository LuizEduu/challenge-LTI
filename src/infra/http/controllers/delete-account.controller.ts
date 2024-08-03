import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { z } from 'zod';
import { UserNotFoundError } from '@/domain/RH/application/use-cases/errors/user-not-found-error';
import { DeleteUserUseCase } from '@/domain/RH/application/use-cases/delete-user';

const deleteAccountParamsSchema = z.object({
  id: z.string(),
});

type DeleteAccountParamsSchema = z.infer<typeof deleteAccountParamsSchema>;

@Controller('/users/:id')
export class DeleteAccountController {
  constructor(private useCase: DeleteUserUseCase) {}

  @UsePipes(new ZodValidationPipe(deleteAccountParamsSchema))
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param() { id }: DeleteAccountParamsSchema) {
    const result = await this.useCase.execute({
      id,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case UserNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException();
      }
    }
  }
}
