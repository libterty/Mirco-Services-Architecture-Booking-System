import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
const configService = new ConfigService(
  `${process.env.NODE_ENV || 'development'}.env`,
);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: configService.get('host'),
  port: configService.getPort('dbPort'),
  username: configService.get('dbUsername'),
  password: configService.get('dbPassword'),
  database: configService.get('database'),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + './migration/*.ts'],
  synchronize: true,
};
