import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Gift extends Model<Gift> {
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
  colected: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  premium: boolean;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
  })
  coins: number;

  @Column({
    type: DataType.DATE,
  })
  expiresAt: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  message: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}
