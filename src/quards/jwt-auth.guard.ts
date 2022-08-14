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
