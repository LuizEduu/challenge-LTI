import { Module } from '@nestjs/common';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateUserUseCase } from '@/domain/RH/application/use-cases/create-user';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';

@Module({
  controllers: [CreateAccountController],
  providers: [CreateUserUseCase],
  imports: [DatabaseModule, CryptographyModule],
})
export class HttpModule {}
