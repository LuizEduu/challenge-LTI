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

const createDeparmentBodySchema = z.object({
  name: z.string(),
  managerId: z.string(),
});

type CreateDeparmentBodySchema = z.infer<typeof createDeparmentBodySchema>;

@Controller('/departments')
export class CreateDeparmentController {
  constructor(private useCase: CreateDepartmentUseCase) {}

  @UsePipes(new ZodValidationPipe(createDeparmentBodySchema))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() body: CreateDeparmentBodySchema) {
    const { name, managerId } = body;

    const result = await this.useCase.execute({
      name,
      managerId,
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
