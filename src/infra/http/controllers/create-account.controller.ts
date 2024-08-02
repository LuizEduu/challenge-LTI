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
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { CreateUserUseCase } from '@/domain/RH/application/use-cases/create-user';
import { UserAlreadyExistsError } from '@/domain/RH/application/use-cases/errors/user-already-exists';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['emplooye', 'manager']),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/users')
export class CreateAccountController {
  constructor(private useCase: CreateUserUseCase) {}

  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password, role } = body;

    const result = await this.useCase.execute({
      name,
      email,
      password,
      role,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException();
        default:
          throw new BadRequestException();
      }
    }

    return {
      user: result.value.user,
    };
  }
}
