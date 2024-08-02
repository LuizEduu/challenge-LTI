import { Module } from '@nestjs/common';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateUserUseCase } from '@/domain/RH/application/use-cases/create-user';

@Module({
  controllers: [CreateAccountController],
  providers: [CreateUserUseCase],
  imports: [],
})
export class HttpModule {}
