import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { HttpUserPresenter } from '../presenters/http-users-presenter';
import { FetchUsersUseCase } from '@/domain/RH/application/use-cases/fetch-users';

const fetchAccountsQuerySchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.string().optional(),
  createdAt: z.string().optional(),
});

type FetchAccountsQuerySchema = z.infer<typeof fetchAccountsQuerySchema>;

@Controller('/users')
export class FetchAccountsController {
  constructor(private useCase: FetchUsersUseCase) {}

  @UsePipes(new ZodValidationPipe(fetchAccountsQuerySchema))
  @Get()
  async handle(
    @Query() { id, email, name, role, createdAt }: FetchAccountsQuerySchema,
  ) {
    const result = await this.useCase.execute({
      id,
      name,
      email,
      role,
      createdAt,
    });

    return {
      users: result.value?.users.map(HttpUserPresenter.toHTTP),
    };
  }
}
