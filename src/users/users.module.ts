import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { InMemoryUsersStore } from './store/user.storage';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/users.model';

@Module({
  providers: [
    UsersService,
    {
      provide: 'UsersStore',
      useClass: InMemoryUsersStore,
    },
  ],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([User])],
})
export class UsersModule {}
