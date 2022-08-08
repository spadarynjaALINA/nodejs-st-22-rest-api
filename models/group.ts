import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { Permission } from 'src/interfaces/group.interface';

interface GroupCreationAttrs {
  name: string;
  permission: Permission[];
}

@Table({ tableName: 'group' })
export class Group extends Model<Group, GroupCreationAttrs> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;
  @Column({
    type: DataType.ARRAY,
    allowNull: false,
  })
  permission: Permission[];
}
