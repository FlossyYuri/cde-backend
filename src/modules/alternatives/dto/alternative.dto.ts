import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Alternative } from '../alternative.entity';

export class AlternativeDto extends PartialType(Alternative) {
  @IsNotEmpty()
  readonly text: string;
}

export class UpdateAlternativeDto extends PartialType(Alternative) {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
  @IsNotEmpty()
  @IsString()
  readonly text: string;
}
