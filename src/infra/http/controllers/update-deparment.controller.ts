import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { UpdateDepartmentUseCase } from '@/domain/RH/application/use-cases/update-department';
import { DepartmentNotFoundError } from '@/domain/RH/application/use-cases/errors/department-not-found';
import { NotAuthorizedError } from '@/domain/RH/application/use-cases/errors/not-authorized-error';
import { HttpDepartmentsPresenter } from '../presenters/http-departments-presenter';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const updateDepartmentBodySchema = z.object({
  name: z.string().optional(),
  managerId: z.string().optional(),
  userId: z.string(),
});

const updateDepartmentParamsSchema = z.object({
  id: z.string(),
});

type UpdateDepartmentBodySchema = z.infer<typeof updateDepartmentBodySchema>;
type UpdateDepartmentParamsSchema = z.infer<
  typeof updateDepartmentParamsSchema
>;

@Controller('/departments/:id')
export class UpdateDepartmentController {
  constructor(private useCase: UpdateDepartmentUseCase) {}

  @UsePipes()
  @Put()
  async handle(
    @Body(new ZodValidationPipe(updateDepartmentBodySchema))
    body: UpdateDepartmentBodySchema,
    @Param(new ZodValidationPipe(updateDepartmentParamsSchema))
    { id }: UpdateDepartmentParamsSchema,
  ) {
    const { name, managerId, userId } = body;

    const result = await this.useCase.execute({
      id,
      name,
      managerId,
      userId,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case DepartmentNotFoundError:
          throw new NotFoundException(error.message);
        case NotAuthorizedError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException();
      }
    }

    return {
      department: HttpDepartmentsPresenter.toHTTP(result.value.department),
    };
  }
}
