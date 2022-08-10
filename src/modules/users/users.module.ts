import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from 'models/group';
import { User } from 'models/user';
import { UserGroups } from 'models/user-group';
import { UsersController } from 'src/controllers/users/users.controller';
import { GroupService } from 'src/services/group/group.service';
import { UsersService } from 'src/services/users/users.service';

@Module({
  providers: [UsersService, GroupService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([User, Group, UserGroups])],
  exports: [UsersService],
})
export class UsersModule {}
