import { HttpException, HttpStatus } from '@nestjs/common';

export const handleError = (err, id?: string, login?: string) => {
  if (err.original && err.original.constraint === 'users_login_key') {
    throw new HttpException(
      `User with login '${login}' already exists`,
      HttpStatus.CONFLICT,
    );
  }
  if (err.message === 'byId') {
    throw new HttpException(
      `User with id '${id}' not found`,
      HttpStatus.NOT_FOUND,
    );
  }
  throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
};
