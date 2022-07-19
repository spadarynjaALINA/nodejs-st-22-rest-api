import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUser, IUserResponse } from '../interfaces/users.interfaces';
import { UsersStore } from '../interfaces/usersStore.interface';
@Injectable()
export class InMemoryUsersStore implements UsersStore {
  users: IUser[] = [];

  userResponse: IUserResponse = {
    id: 'id',
    login: 'login',
    age: 24,
    isDeleted: false,
  };

  all(): IUser[] {
    return this.users.filter((user) => user.isDeleted === false);
  }

  findById(id: string): IUser | void {
    const user = this.users.find(
      (User) => User.id === id && User.isDeleted === false,
    );
    if (user) return user;
    throw new HttpException('User not exist', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  create(UserDto: CreateUserDto): IUserResponse {
    const newUser = {
      ...UserDto,
      id: uuid(),
      isDeleted: false,
    };
    this.users.push(newUser);
    for (const key in newUser) {
      if (key !== 'password') {
        this.userResponse[key] = newUser[key];
      }
    }
    return this.userResponse;
  }

  update(params: UpdateUserDto): IUserResponse | void {
    if (!this.findById(params.id)) {
      throw new HttpException(
        'User not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      this.users.map((User) => {
        if (User.id === params.id) {
          Object.assign(User, params);
          for (const key in User) {
            if (key !== 'password') {
              this.userResponse[key] = User[key];
            }
          }
        }
      });
      return this.userResponse;
    }
  }
  delete(id: string): string | void {
    if (!!this.findById(id)) {
      this.users = this.users.map((user) => {
        user.id === id ? (user.isDeleted = true) : user;
        return user;
      });
    } else {
      throw new HttpException(
        'User not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
  findOneByName(name: string) {
    return !!this.users.find(
      (user) => user.login === name && user.isDeleted === false,
    );
  }
  private static instance: UsersStore;
  constructor() {
    if (!InMemoryUsersStore.instance) {
      InMemoryUsersStore.instance = this;
    }
    return InMemoryUsersStore.instance;
  }
}
