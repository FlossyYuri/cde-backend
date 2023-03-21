import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { QuestionTestDto } from 'src/modules/question-test/dto/question-test.dto';
import { Test } from '../test.entity';

export class TestDto extends PartialType(Test) {
  @IsNotEmpty()
  readonly category: string;
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly duration: number;
  @IsNotEmpty()
  readonly max_errors: number;
  @IsNotEmpty()
  readonly subject_id: number;
  @IsNotEmpty()
  readonly questionsIdList: number[];
}

export class UpdateTestDto extends PartialType(Test) {
  @IsNotEmpty()
  @IsOptional()
  readonly category: string;
  @IsNotEmpty()
  @IsOptional()
  readonly name: string;
  @IsNotEmpty()
  @IsOptional()
  readonly duration: number;
  @IsNotEmpty()
  @IsOptional()
  readonly max_errors: number;
  @IsNotEmpty()
  @IsOptional()
  readonly subject_id: number;
  @IsNotEmpty()
  readonly questionsIdList: number[];
}
