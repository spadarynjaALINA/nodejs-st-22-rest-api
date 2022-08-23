import { Permission, PermissionGroup } from './../interfaces/group.interface';
import { IsString, IsNotEmpty, IsEnum, IsArray } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsEnum(PermissionGroup, { each: true })
  permissions: Permission[];
}
