import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Group } from 'models/group';
import { User } from 'models/user';
import { GroupModule } from './group/group.module';
import { UserGroups } from 'models/user-group';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    UsersModule,
    GroupModule,
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
})
export class AppModule {}
