import { HashGenerator } from '@/domain/RH/application/cryptography/hash-generator';
import { Module } from '@nestjs/common';
import { BcryptHasher } from './bcrypt-hasher';

@Module({
  providers: [
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
  ],

  exports: [HashGenerator],
})
export class CryptographyModule {}
