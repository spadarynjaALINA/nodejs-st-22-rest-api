import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Group } from './group';
import { User } from './user';

interface UserGroupCreationAttrs {
  login: string;
  password: string;
}
@Table({ tableName: 'userGroups' })
export class UserGroups extends Model<UserGroups, UserGroupCreationAttrs> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId: string;
  @ForeignKey(() => Group)
  @Column({
    type: DataType.UUID,
  })
  groupId: string;
}
