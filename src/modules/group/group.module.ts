import { Module } from '@nestjs/common';
import { GroupService } from '../../services/group/group.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from 'models/group';
import { UserGroups } from 'models/user-group';
import { User } from 'models/user';
import { UsersService } from 'src/services/users/users.service';
import { GroupController } from 'src/controllers/group/group.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [GroupService, UsersService, JwtService],
  controllers: [GroupController],
  imports: [SequelizeModule.forFeature([Group, User, UserGroups])],
  exports: [GroupService],
})
export class GroupModule {}
