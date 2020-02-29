import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {}
