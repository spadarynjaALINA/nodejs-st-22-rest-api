import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUser, IUserResponse } from './users.interfaces';

export interface UsersStore {
  all: () => IUser[];
  findById: (id: string) => IUser | void;
  create: (params: CreateUserDto) => IUserResponse;
  update: (params: UpdateUserDto) => IUserResponse | void;
  delete: (id: string) => string | void;
  findOneByName: (name: string) => boolean;
  users: IUser[];
  userResponse: IUserResponse;
}
