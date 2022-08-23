import { Module } from '@nestjs/common';
import { GroupService } from '../../services/group/group.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { Group } from './../../models/group';
import { GroupController } from './../../controllers/group/group.controller';
import { User } from './../../models/user';
import { UserGroups } from './../../models/user-group';
import { UsersService } from './../../services/users/users.service';

@Module({
  providers: [GroupService, UsersService, JwtService],
  controllers: [GroupController],
  imports: [SequelizeModule.forFeature([Group, User, UserGroups])],
  exports: [GroupService, SequelizeModule],
})
export class GroupModule {}
