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
import { DeleteDepartmentUseCase } from '@/domain/RH/application/use-cases/delete-department';
import { DepartmentNotFoundError } from '@/domain/RH/application/use-cases/errors/department-not-found';
import { NotAuthorizedError } from '@/domain/RH/application/use-cases/errors/not-authorized-error';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenPayload } from '@/infra/auth/jwt-strategy';

const deleteDepartmentParamsSchema = z.object({
  id: z.string(),
});

type DeleteDepartmentParamsSchema = z.infer<
  typeof deleteDepartmentParamsSchema
>;

@Controller('/departments/:id')
export class DeleteDepartmentController {
  constructor(private useCase: DeleteDepartmentUseCase) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @Param(new ZodValidationPipe(deleteDepartmentParamsSchema))
    { id }: DeleteDepartmentParamsSchema,
    @CurrentUser() user: TokenPayload,
  ) {
    const result = await this.useCase.execute({
      id,
      userId: user.sub,
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
