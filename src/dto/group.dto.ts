import { Permission } from 'src/interfaces/group.interface';

export class GroupDto {
  readonly id: string;
  readonly name: string;
  readonly permission: Permission[];
}
