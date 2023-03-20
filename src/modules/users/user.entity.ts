import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
  IsUrl,
  Default,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @IsUrl
  @Column
  image: string;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
  })
  coins: number;

  @Default(2)
  @Column({
    type: DataType.INTEGER,
  })
  tests: number;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  premium: boolean;
}
