import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './../../models/group';
import { User } from './../../models/user';
import { UserGroups } from './../../models/user-group';
import { UsersController } from './../../controllers/users/users.controller';
import { GroupService } from './../../services/group/group.service';
import { UsersService } from './../../services/users/users.service';
import 'dotenv/config';
import { JwtStrategy } from './../../strategies/jwt.strategy';

@Module({
  providers: [UsersService, GroupService, JwtService, JwtStrategy],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Group, UserGroups]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [UsersService, SequelizeModule],
})
export class UsersModule {}
