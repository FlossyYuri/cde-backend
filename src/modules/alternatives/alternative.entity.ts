import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Question } from '../questions/question.entity';

@Table
export class Alternative extends Model<Alternative> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
  })
  text: string;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
  })
  question_id: number;

  @BelongsTo(() => Question)
  question: Question;
}
