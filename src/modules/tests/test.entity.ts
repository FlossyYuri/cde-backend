import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { QuestionTest } from '../question-test/question-test.entity';
import { Question } from '../questions/question.entity';
import { Subject } from '../subjects/subject.entity';

@Table
export class Test extends Model<Test> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  category: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Default(30)
  @Column({
    type: DataType.INTEGER,
  })
  duration: number;

  @Default(2)
  @Column({
    type: DataType.INTEGER,
  })
  max_errors: number;

  @ForeignKey(() => Subject)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  subject_id: number;

  @BelongsTo(() => Subject)
  subject: Subject;

  @BelongsToMany(() => Question, () => QuestionTest)
  questions: Question[];
}
