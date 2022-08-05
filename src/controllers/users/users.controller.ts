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
import { handleError } from 'src/handle-errors/handleError';
import { checkUser } from 'src/handle-errors/check-user';

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
