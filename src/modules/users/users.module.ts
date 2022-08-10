import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from 'models/group';
import { User } from 'models/user';
import { UserGroups } from 'models/user-group';
import { UsersController } from 'src/controllers/users/users.controller';
import { UsersService } from 'src/services/users/users.service';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([User, Group, UserGroups])],
})
export class UsersModule {}
