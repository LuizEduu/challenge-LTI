import { Module } from '@nestjs/common';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateUserUseCase } from '@/domain/RH/application/use-cases/create-user';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { FetchAccountsController } from './controllers/fetch-accounts.controller';
import { FetchUsersUseCase } from '@/domain/RH/application/use-cases/fetch-users';
import { FindAccountController } from './controllers/find-account.controller';
import { FindUserUseCase } from '@/domain/RH/application/use-cases/find-user';
import { DeleteAccountController } from './controllers/delete-account.controller';
import { DeleteUserUseCase } from '@/domain/RH/application/use-cases/delete-user';
import { UpdateAccountController } from './controllers/update-account.controller';
import { UpdateUserUseCase } from '@/domain/RH/application/use-cases/update-user';

@Module({
  controllers: [
    CreateAccountController,
    FetchAccountsController,
    FindAccountController,
    DeleteAccountController,
    UpdateAccountController,
  ],
  providers: [
    CreateUserUseCase,
    FetchUsersUseCase,
    FindUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
  ],
  imports: [DatabaseModule, CryptographyModule],
})
export class HttpModule {}
