import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  IsUrl,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class New extends Model<New> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  active: boolean;

  @IsUrl
  @Column
  image: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;
}
