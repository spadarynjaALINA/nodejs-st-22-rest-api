import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { InMemoryUsersStore } from './store/user.storage';

@Module({
  providers: [
    UsersService,
    {
      provide: 'UsersStore',
      useClass: InMemoryUsersStore,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
