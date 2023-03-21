import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { UpdateAlternativeDto } from 'src/modules/alternatives/dto/alternative.dto';
import { Question } from '../question.entity';

export class QuestionDto extends PartialType(Question) {
  @IsNotEmpty()
  readonly category: string;
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
  @IsNotEmpty()
  readonly question: string;
  @IsNotEmpty()
  readonly answer: string;
  @IsNotEmpty()
  readonly subject_id: number;
  @IsNotEmpty()
  readonly alternativas: string[];
}

export class UpdateQuestionDto extends PartialType(Question) {
  @IsNotEmpty()
  @IsOptional()
  readonly category: string;
  @IsNotEmpty()
  @IsUrl()
  @IsOptional()
  readonly image: string;
  @IsNotEmpty()
  @IsOptional()
  readonly question: string;
  @IsNotEmpty()
  @IsOptional()
  readonly answer: string;
  @IsNotEmpty()
  @IsOptional()
  readonly subject_id: number;
  @IsNotEmpty()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAlternativeDto)
  readonly alternativesList: UpdateAlternativeDto[];
}
