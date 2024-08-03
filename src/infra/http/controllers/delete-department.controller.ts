import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { DeleteDepartmentUseCase } from '@/domain/RH/application/use-cases/delete-department';
import { DepartmentNotFoundError } from '@/domain/RH/application/use-cases/errors/department-not-found';
import { NotAuthorizedError } from '@/domain/RH/application/use-cases/errors/not-authorized-error';

const deleteDepartmentParamsSchema = z.object({
  id: z.string(),
});

type DeleteDepartmentParamsSchema = z.infer<
  typeof deleteDepartmentParamsSchema
>;

@Controller('/departments/:id')
export class DeleteDepartmentController {
  constructor(private useCase: DeleteDepartmentUseCase) {}

  @UsePipes(new ZodValidationPipe(deleteDepartmentParamsSchema))
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param() { id }: DeleteDepartmentParamsSchema) {
    const result = await this.useCase.execute({
      id,
      userId: '',
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
  }
}
