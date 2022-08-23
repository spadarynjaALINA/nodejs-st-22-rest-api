import { Permission } from './../interfaces/group.interface';
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import { User } from './user';
import { UserGroups } from './user-group';

interface GroupCreationAttrs {
  name: string;
  permission: Permission[];
}

@Table({ tableName: 'group' })
export class Group extends Model<Group, GroupCreationAttrs> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4(),
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  permissions: Permission[];
  @BelongsToMany(() => User, () => UserGroups)
  user: User[];
}
