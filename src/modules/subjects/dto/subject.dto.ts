import { IsNotEmpty, IsOptional } from 'class-validator';

export class SubjectDto {
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateSubjectDto {
  @IsNotEmpty()
  @IsOptional()
  readonly name: string;
}
