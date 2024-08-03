import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { FetchDepartmentsUseCase } from '@/domain/RH/application/use-cases/fetch-departments';
import { HttpDepartmentsPresenter } from '../presenters/http-departments-presenter';

const fetchDepartmentsQuerySchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  managerId: z.string().optional(),
  createdAt: z.string().optional(),
});

type FetchDepartmentsQuerySchema = z.infer<typeof fetchDepartmentsQuerySchema>;

@Controller('/departments')
export class FetchDepartmentsController {
  constructor(private useCase: FetchDepartmentsUseCase) {}

  @UsePipes(new ZodValidationPipe(fetchDepartmentsQuerySchema))
  @Get()
  async handle(
    @Query() { id, name, managerId, createdAt }: FetchDepartmentsQuerySchema,
  ) {
    const result = await this.useCase.execute({
      id,
      name,
      managerId,
      createdAt,
    });

    return {
      departments: result.value?.departments.map(
        HttpDepartmentsPresenter.toHTTP,
      ),
    };
  }
}
