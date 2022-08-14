import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../../models/user';
import { v4 as uuid } from 'uuid';
import { Op } from 'sequelize';
import { IQuery, IUser } from 'src/interfaces/users.interfaces';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwt: JwtService,
  ) {}

  async create(UserDto: CreateUserDto): Promise<IUser> {
    const newUser = {
      ...UserDto,
      id: uuid(),
      isDeleted: false,
    };

    const user = await this.userRepository.create(newUser);
    return user;
  }

  async login(UserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { login: UserDto.login },
    });
    if (user) {
      const payload = {
        sub: user.id,
        email: user.login,
      };
      const token = this.jwt.signAsync(payload, {
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_KEY,
      });
      return token;
    }
  }

  async getAutoSuggestUsers(query: IQuery): Promise<IUser[]> {
    const users = await this.userRepository.findAndCountAll({
      where: { login: { [Op.substring]: query.loginSubstring || '' } },
      limit: query.limit || 15,
      order: [['login', 'ASC']],
    });
    return users.rows;
  }

  async findOne(id: string): Promise<IUser> {
    return await this.userRepository.findOne({
      where: { id: id },
      include: { all: true },
    });
  }

  async update(updateUserDto: UpdateUserDto): Promise<IUser> {
    const user = await this.userRepository.update(updateUserDto, {
      where: { id: updateUserDto.id },
      returning: true,
    });
    return user[1][0];
  }

  async remove(id: string): Promise<IUser> {
    if ((await this.findOne(id)).isDeleted !== true) {
      const user = await this.userRepository.update(
        { isDeleted: true },
        {
          where: { id },
          returning: true,
        },
      );
      return user[1][0];
    }
  }
}
