import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IQuery } from '../interfaces/users.interfaces';
import { UsersStore } from '../interfaces/usersStore.interface';

@Injectable()
export class UsersService {
  constructor(@Inject('UsersStore') private storage: UsersStore) {}
  create(createUserDto: CreateUserDto) {
    return this.storage.create(createUserDto);
  }

  getAutoSuggestUsers(query: IQuery) {
    return this.storage.getAutoSuggestUsers(query);
  }

  findOne(id: string) {
    return this.storage.findById(id);
  }

  update(updateUserDto: UpdateUserDto) {
    return this.storage.update(updateUserDto);
  }

  remove(id: string) {
    return this.storage.delete(id);
  }
}
