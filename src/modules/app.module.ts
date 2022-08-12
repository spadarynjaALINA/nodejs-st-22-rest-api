import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Group } from 'models/group';
import { User } from 'models/user';
import { GroupModule } from './group/group.module';
import { UserGroups } from 'models/user-group';
import { LoggerMiddleware } from 'src/logger/logger.middleware';
import { UsersController } from 'src/controllers/users/users.controller';
import { GroupController } from 'src/controllers/group/group.controller';
import { AllExceptionsFilter } from 'src/logger/httpexception-filter.service';
import { APP_FILTER } from '@nestjs/core';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { customFormat } from 'src/logger/util';
// const formatMeta = (meta) => {
//   const splat = meta[Symbol.for('splat')];
//   if (splat && splat.length) {
//     return splat.length === 1
//       ? JSON.stringify(splat[0])
//       : JSON.stringify(splat);
//   }
//   return splat;
// };

// const customFormat = winston.format.printf(
//   ({ timestamp, level, message, label = '', ...meta }) => {
//     console.log(timestamp, level, label, message, formatMeta(meta));
//     return `[${timestamp}] ${level} ${message} ${formatMeta(meta)}`;
//   },
// );

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    UsersModule,
    GroupModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize({ all: true }),
            winston.format.ms(),
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            customFormat,
          ),
        }),
      ],
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      models: [User, Group, UserGroups],
      autoLoadModels: true,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UsersController, GroupController);
  }
}
