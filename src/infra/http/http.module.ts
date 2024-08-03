import { Module } from '@nestjs/common';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateUserUseCase } from '@/domain/RH/application/use-cases/create-user';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [CreateAccountController],
  providers: [CreateUserUseCase],
  imports: [DatabaseModule],
})
export class HttpModule {}
