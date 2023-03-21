import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { QuestionTest } from '../question-test.entity';

export class QuestionTestDto extends PartialType(QuestionTest) {
  @IsNotEmpty()
  readonly test_id: number;
  @IsNotEmpty()
  readonly question_id: number;
}
