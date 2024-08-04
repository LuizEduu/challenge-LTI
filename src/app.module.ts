import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CryptographyModule } from './infra/cryptography/cryptography.module';
import { AuthModule } from './infra/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    DatabaseModule,
    CryptographyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
