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
import { z } from 'zod';
import { CreateUserUseCase } from '@/domain/RH/application/use-cases/create-user';
import { UserAlreadyExistsError } from '@/domain/RH/application/use-cases/errors/user-already-exists';
import { HttpUserPresenter } from '../presenters/http-users-presenter';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { Public } from '@/infra/auth/public';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['emplooye', 'manager']),
  departmentsIds: z.array(z.string()).optional(),
  benefitsIds: z.array(z.string()).optional(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/users')
export class CreateAccountController {
  constructor(private useCase: CreateUserUseCase) {}

  @Public()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password, role, departmentsIds, benefitsIds } = body;

    const result = await this.useCase.execute({
      name,
      email,
      password,
      role,
      departmentsIds,
      benefitsIds,
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
