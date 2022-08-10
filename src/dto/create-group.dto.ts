import { IsString, IsNotEmpty, IsEnum, IsArray } from 'class-validator';
import { Permission, PermissionGroup } from 'src/interfaces/group.interface';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsEnum(PermissionGroup, { each: true })
  permissions: Permission[];
}
