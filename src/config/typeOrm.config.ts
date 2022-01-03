import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const serverConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: serverConfig.type,
  host: process.env.RDS_HOSTNAME || serverConfig.host,
  port: process.env.RDS_PORT || serverConfig.port,
  username: process.env.RDS_USERNAME || serverConfig.username,
  password: process.env.RDS_PASSWORD || serverConfig.password,
  database: serverConfig.database,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  synchronize: serverConfig.synchronize,
};
