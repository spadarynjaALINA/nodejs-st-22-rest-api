import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IQuery } from '../interfaces/users.interfaces';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/users.model';
import { v4 as uuid } from 'uuid';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(UserDto: CreateUserDto) {
    const newUser = {
      ...UserDto,
      id: uuid(),
      isDeleted: false,
    };
    const user = await this.userRepository.create(newUser);
    return user;
  }

  async getAutoSuggestUsers(query: IQuery) {
    const users = await this.userRepository.findAndCountAll({
      where: { login: { [Op.substring]: query.loginSubstring || '' } },
      limit: query.limit || 15,
      order: [['login', 'ASC']],
    });
    return users;
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async update(updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.update(updateUserDto, {
      where: { id: updateUserDto.id },
      returning: true,
    });
    return user[1][0];
  }

  async remove(id: string) {
    return await this.userRepository.destroy({
      where: { id: id },

    });
  }
}
