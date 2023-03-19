import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  Unique,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Subject extends Model<Subject> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
