import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Question } from '../questions/question.entity';
import { Test } from '../tests/test.entity';

@Table
export class QuestionTest extends Model<QuestionTest> {
  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  question_id: number;

  @ForeignKey(() => Test)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  test_id: number;
}
