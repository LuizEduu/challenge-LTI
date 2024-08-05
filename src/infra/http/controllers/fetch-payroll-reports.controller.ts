import { Controller, Get, Query } from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { z } from 'zod';
import { FetchEmplooyePayrollUseCase } from '@/domain/RH/application/use-cases/fetch-emplooye-payroll';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenPayload } from '@/infra/auth/jwt-strategy';
import { HttpPayrollPresenter } from '../presenters/http-payroll-presenter';

const fetchPayrollReportsQuerySchema = z.object({
  departmentIds: z.string().optional(),
  initialPeriod: z
    .string()
    .transform((value) => new Date(value))
    .optional(),
  lastPeriod: z
    .string()
    .transform((value) => new Date(value))
    .optional(),
});

type FetchPayrollReportsQuerySchema = z.infer<
  typeof fetchPayrollReportsQuerySchema
>;

@Controller('/payroll/reports')
export class FetchPayrollReportsController {
  constructor(private useCase: FetchEmplooyePayrollUseCase) {}

  @Get()
  async handle(
    @Query(new ZodValidationPipe(fetchPayrollReportsQuerySchema))
    {
      departmentIds,
      initialPeriod,
      lastPeriod,
    }: FetchPayrollReportsQuerySchema,
    @CurrentUser() user: TokenPayload,
  ) {
    const result = await this.useCase.execute({
      userId: user.sub,
      departmentIds,
      initialPeriod,
      lastPeriod,
    });

    return result.value?.payrollReports.map(
      HttpPayrollPresenter.toHTTPPayrollReport,
    );
  }
}
