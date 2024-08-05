import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Param,
  Put,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { z } from 'zod';
import { UpdateUserUseCase } from '@/domain/RH/application/use-cases/update-user';
import { UserAlreadyExistsError } from '@/domain/RH/application/use-cases/errors/user-already-exists';
import { HttpUserPresenter } from '../presenters/http-users-presenter';

const updateAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['emplooye', 'manager']),
});

const updateAccountParamsSchema = z.object({
  id: z.string(),
});

type UpdateAccountBodySchema = z.infer<typeof updateAccountBodySchema>;
type UpdateAccountParamsSchema = z.infer<typeof updateAccountParamsSchema>;

@Controller('/users/:id')
export class UpdateAccountController {
  constructor(private useCase: UpdateUserUseCase) {}

  @Put()
  async handle(
    @Body(new ZodValidationPipe(updateAccountBodySchema))
    body: UpdateAccountBodySchema,
    @Param(new ZodValidationPipe(updateAccountParamsSchema))
    { id }: UpdateAccountParamsSchema,
  ) {
    const { name, email, password, role } = body;

    const result = await this.useCase.execute({
      id,
      name,
      email,
      password,
      role,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    return {
      user: HttpUserPresenter.toHTTP(result.value.user),
    };
  }
}
