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
import { CreateDepartmentUseCase } from '@/domain/RH/application/use-cases/create-department';
import { UserNotFoundError } from '@/domain/RH/application/use-cases/errors/user-not-found-error';
import { DepartmentAlreadyExistsError } from '@/domain/RH/application/use-cases/errors/department-already-exists';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenPayload } from '@/infra/auth/jwt-strategy';

const createDeparmentBodySchema = z.object({
  name: z.string(),
});

type CreateDeparmentBodySchema = z.infer<typeof createDeparmentBodySchema>;

@Controller('/departments')
export class CreateDeparmentController {
  constructor(private useCase: CreateDepartmentUseCase) {}

  @UsePipes()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body(new ZodValidationPipe(createDeparmentBodySchema))
    body: CreateDeparmentBodySchema,
    @CurrentUser() user: TokenPayload,
  ) {
    const { name } = body;

    const result = await this.useCase.execute({
      name,
      managerId: user.sub,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case UserNotFoundError:
          throw new BadRequestException(error.message);
        case DepartmentAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException();
      }
    }

    return {
      department: result.value.department,
    };
  }
}
