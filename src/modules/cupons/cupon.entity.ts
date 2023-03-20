import { MaxLength } from 'class-validator';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Max,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Cupon extends Model<Cupon> {
  @MaxLength(12)
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string;

  @Max(500)
  @Column({
    type: DataType.INTEGER,
  })
  coins: number;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  used: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  premium: boolean;

  @Column({
    type: DataType.DATE,
  })
  expiresAt: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}
