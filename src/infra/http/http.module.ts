import { Module } from '@nestjs/common';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateUserUseCase } from '@/domain/RH/application/use-cases/create-user';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { FetchAccountsController } from './controllers/fetch-accounts.controller';
import { FetchUsersUseCase } from '@/domain/RH/application/use-cases/fetch-users';
import { FindAccountController } from './controllers/find-account.controller';
import { FindUserUseCase } from '@/domain/RH/application/use-cases/find-user';

@Module({
  controllers: [
    CreateAccountController,
    FetchAccountsController,
    FindAccountController,
  ],
  providers: [CreateUserUseCase, FetchUsersUseCase, FindUserUseCase],
  imports: [DatabaseModule, CryptographyModule],
})
export class HttpModule {}
