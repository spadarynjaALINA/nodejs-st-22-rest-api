import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { Permission } from 'src/interfaces/group.interface';
import { StringDecoder } from 'string_decoder';

interface GroupCreationAttrs {
  name: string;
  permission: Permission[];
}

@Table({ tableName: 'groups' })
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
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  permission: Permission[];
}
