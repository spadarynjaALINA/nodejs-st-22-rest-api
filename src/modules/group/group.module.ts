import { Module } from '@nestjs/common';
import { GroupService } from '../../services/group/group.service';
import { GroupController } from '../../controllers/group/group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from 'models/group';
import { UserGroups } from 'models/user-group';
import { User } from 'models/user';
import { UsersService } from 'src/services/users/users.service';

@Module({
  providers: [GroupService, UsersService],
  controllers: [GroupController],
  imports: [SequelizeModule.forFeature([Group, User, UserGroups])],
  exports: [GroupService],
})
export class GroupModule {}
