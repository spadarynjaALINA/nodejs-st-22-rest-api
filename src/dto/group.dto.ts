import { IsString, IsNotEmpty, IsEnum, IsArray } from 'class-validator';
import { IsUUID } from 'sequelize-typescript';
import { Permission, PermissionGroup } from 'src/interfaces/group.interface';
export class GroupDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsArray()
  @IsEnum(PermissionGroup, { each: true })
  readonly permissions: Permission[];
}
