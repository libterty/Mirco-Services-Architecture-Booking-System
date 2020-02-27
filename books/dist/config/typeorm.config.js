"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_service_1 = require("./config.service");
const configService = new config_service_1.ConfigService(`${process.env.NODE_ENV || 'development'}.env`);
exports.typeOrmConfig = {
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
//# sourceMappingURL=typeorm.config.js.map