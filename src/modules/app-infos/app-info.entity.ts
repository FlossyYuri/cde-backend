import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class AppInfo extends Model<AppInfo> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  bundle: number;

  @Column({
    type: DataType.STRING,
  })
  version: string;

  @Column({
    type: DataType.ENUM,
    values: ['android', 'ios'],
  })
  platform: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  state: boolean;
}
