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
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { CreatePayrollUseCase } from '@/domain/RH/application/use-cases/create-payroll';
import { PayrollInPeriodAlreadyExistsError } from '@/domain/RH/application/use-cases/errors/payroll-in-period-already-exists-error';
import { HttpPayrollPresenter } from '../presenters/http-payroll-presenter';

const createPayrollBodySchema = z.object({
  name: z.string(),
  firstPeriod: z.date(),
  lastPeriod: z.date(),
  month: z.number(),
  year: z.number(),
  departmentId: z.string(),
  hoursWorked: z.number(),
  hourValue: z.number(),
  employeeId: z.string(),
});

type CreatePayrollBodySchema = z.infer<typeof createPayrollBodySchema>;

@Controller('/payroll')
export class CreatePayrollController {
  constructor(private useCase: CreatePayrollUseCase) {}

  @UsePipes(new ZodValidationPipe(createPayrollBodySchema))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() body: CreatePayrollBodySchema) {
    const {
      name,
      firstPeriod,
      lastPeriod,
      month,
      year,
      hourValue,
      employeeId,
      hoursWorked,
      departmentId,
    } = body;

    const result = await this.useCase.execute({
      name,
      firstPeriod,
      lastPeriod,
      month,
      year,
      hourValue,
      employeeId,
      hoursWorked,
      departmentId,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case PayrollInPeriodAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    return {
      payroll: HttpPayrollPresenter.toHTTP(result.value.payroll),
    };
  }
}
