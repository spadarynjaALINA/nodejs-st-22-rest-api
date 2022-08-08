import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'models/user';
import { UsersController } from 'src/controllers/users/users.controller';
import { UsersService } from 'src/services/users/users.service';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([User])],
})
export class UsersModule {}
