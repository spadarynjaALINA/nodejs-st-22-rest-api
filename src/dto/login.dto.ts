import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/, {
    message: 'password must contain letters and numbers',
  })
  password: string;
}
