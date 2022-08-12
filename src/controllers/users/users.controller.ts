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
  Inject,
  Logger,
} from '@nestjs/common';

import { handleError } from 'src/handle-errors/handleError';
import { checkUser } from 'src/handle-errors/check-user';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { IQuery } from 'src/interfaces/users.interfaces';
import { UsersService } from 'src/services/users/users.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto).catch((err) => {
      handleError(err, createUserDto.login, createUserDto.login);
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAutoSuggestUsers(@Query() query: IQuery) {
    return await this.usersService
      .getAutoSuggestUsers(query)
      .catch((err) => handleError(err));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.usersService
      .findOne(id)
      .then((user) => checkUser(user))
      .catch((err) => handleError(err, id));
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() updateUserDto: UpdateUserDto) {
    return await this.usersService
      .update(updateUserDto)
      .then((user) => checkUser(user))
      .catch((err) => handleError(err, updateUserDto.id, updateUserDto.login));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.usersService
      .remove(id)
      .then((user) => checkUser(user))
      .catch((err) => handleError(err, id));
  }
}
