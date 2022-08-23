import { IsString, IsNotEmpty, IsEnum, IsArray } from 'class-validator';
import { Permission, PermissionGroup } from './../interfaces/group.interface';
export class GroupDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsArray()
  @IsEnum(PermissionGroup, { each: true })
  readonly permissions: Permission[];
}
