import { HashGenerator } from '@/domain/RH/application/cryptography/hash-generator';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';

@Injectable()
export class BcryptHasher implements HashGenerator {
  private HASH_SALT_LENGTH = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }
}
