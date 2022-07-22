import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
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
