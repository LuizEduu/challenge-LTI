import { HashGenerator } from '@/domain/RH/application/cryptography/hash-generator';
import { Module } from '@nestjs/common';
import { BcryptHasher } from './bcrypt-hasher';
import { HashComparer } from '@/domain/RH/application/cryptography/hash-comparer';
import { Encrypter } from '@/domain/RH/application/cryptography/encrypter';
import { JwtEncrypter } from './jwt-encrypter';

@Module({
  providers: [
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
  ],

  exports: [HashGenerator, HashComparer, Encrypter],
})
export class CryptographyModule {}
