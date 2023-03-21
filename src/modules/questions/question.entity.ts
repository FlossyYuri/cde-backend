import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  IsUrl,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Alternative } from '../alternatives/alternative.entity';
import { QuestionTest } from '../question-test/question-test.entity';
import { Subject } from '../subjects/subject.entity';
import { Test } from '../tests/test.entity';

@Table
export class Question extends Model<Question> {
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

  @IsUrl
  @Column
  image: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  question: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  answer: string;

  @ForeignKey(() => Subject)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  subject_id: number;

  @BelongsTo(() => Subject)
  subject: Subject;

  @BelongsToMany(() => Test, () => QuestionTest)
  tests: Test[];

  @HasMany(() => Alternative)
  alternatives: Alternative[];
}
