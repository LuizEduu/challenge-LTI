import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { Public } from '@/infra/auth/public';
import { AuthenticateUserUseCase } from '@/domain/RH/application/use-cases/authenticate-user';
import { WrongCredentialsError } from '@/domain/RH/application/use-cases/errors/wrong-credentials-error';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/sessions')
export class SessionsAuthenticateController {
  constructor(private useCase: AuthenticateUserUseCase) {}

  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  @Post()
  @Public()
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const result = await this.useCase.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    return {
      access_token: result.value.accessToken,
    };
  }
}
