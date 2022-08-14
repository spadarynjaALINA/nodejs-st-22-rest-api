import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      if (info instanceof JsonWebTokenError) {
        throw new HttpException(info.message, HttpStatus.FORBIDDEN);
      }
      if (info instanceof Error) {
        throw new HttpException(info.message, HttpStatus.UNAUTHORIZED);
      }
    }
    return user;
  }
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmRlNGM0Ni1jZDQzLTRiNjctOTA0ZC1iZGRmYmZiNzU0MjEiLCJlbWFpbCI6ImFiZyIsImlhdCI6MTY2MDQ4MDMwMiwiZXhwIjoxNjYwNTY2NzAyfQ.ZQz3jZNyXwEVKabmzwWJ82i5-Y9kIHxbKPlQhLEde1I
