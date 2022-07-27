import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IQuery } from '../interfaces/users.interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto).catch((err) => {
      if (err.original.constraint === 'users_login_key') {
        throw new HttpException(
          `User with login '${createUserDto.login}' already exists`,
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAutoSuggestUsers(@Query() query: IQuery) {
    return await this.usersService.getAutoSuggestUsers(query).catch((err) => {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.usersService
      .findOne(id)
      .then((user) => {
        if (!user) {
          throw new Error();
        }
        return user;
      })
      .catch(() => {
        throw new HttpException(
          `User with id '${id}' not found`,
          HttpStatus.NOT_FOUND,
        );
      });
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() updateUserDto: UpdateUserDto) {
    return await this.usersService
      .update(updateUserDto)
      .then((user) => {
        if (!user) {
          throw new Error();
        }
        return user;
      })
      .catch((err) => {
        if (!!err.original && err.original.constraint === 'users_login_key') {
          throw new HttpException(
            `User with login '${updateUserDto.login}' already exists`,
            HttpStatus.CONFLICT,
          );
        }
        throw new HttpException(
          `User with id '${updateUserDto.id}' not found`,
          HttpStatus.NOT_FOUND,
        );
      });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.usersService
      .remove(id)
      .then((user) => {
        if (!user) {
          throw new Error();
        }
        return user;
      })
      .catch(() => {
        throw new HttpException(
          `User with id '${id}' not found`,
          HttpStatus.NOT_FOUND,
        );
      });
  }
}
