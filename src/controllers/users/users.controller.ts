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
  UseGuards,
} from '@nestjs/common';

import { handleError } from './../../handle-errors/handleError';
import { checkUser } from './../../handle-errors/check-user';

import { UpdateUserDto } from './../../dto/update-user.dto';
import { IQuery } from './../../interfaces/users.interfaces';
import { UsersService } from './../../services/users/users.service';
import { LoginUserDto } from './../../dto/login.dto';
import { JwtAuthGuard } from './../../quards/jwt-auth.guard';
import { CreateUserDto } from './../../dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto).catch((err) => {
      handleError(err, createUserDto.login, createUserDto.login);
    });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.usersService.login(loginUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAutoSuggestUsers(@Query() query: IQuery) {
    return await this.usersService
      .getAutoSuggestUsers(query)
      .catch((err) => handleError(err));
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.usersService
      .findOne(id)
      .then((user) => checkUser(user))
      .catch((err) => handleError(err, id));
  }
  @UseGuards(JwtAuthGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() updateUserDto: UpdateUserDto) {
    return await this.usersService
      .update(updateUserDto)
      .then((user) => checkUser(user))
      .catch((err) => handleError(err, updateUserDto.id, updateUserDto.login));
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.usersService
      .remove(id)
      .then((user) => checkUser(user))
      .catch((err) => handleError(err, id));
  }
}
