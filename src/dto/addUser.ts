import { IsUUID, IsArray } from 'class-validator';

export class AddUserDto {
  @IsArray()
  @IsUUID('4', { each: true })
  userIds: string[];
}
