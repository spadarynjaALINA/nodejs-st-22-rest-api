import { Table, Model, Column, DataType } from 'sequelize-typescript';

interface UserCreationAttrs {
  login: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
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
  login: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  age: number;
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDeleted: boolean;
}
