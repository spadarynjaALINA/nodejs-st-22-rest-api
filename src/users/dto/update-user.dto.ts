import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { IsUserAlreadyExist } from '../customValidator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  @IsUserAlreadyExist({
    message: 'User $value already exists. Choose another name.',
  })
  login: string;
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/, {
    message: 'password must contain letters and numbers',
  })
  password: string;
  @IsInt()
  @Min(4)
  @Max(130)
  @IsNotEmpty()
  age: number;
}
