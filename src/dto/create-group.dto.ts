import { Permission } from 'src/interfaces/group.interface';

export class CreateGroupDto {
  readonly name: string;
  readonly permission: Permission[];
}
