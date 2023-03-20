import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Gift } from '../gift.entity';

export class GiftDto extends PartialType(Gift) {
  @IsNotEmpty()
  @IsOptional()
  readonly premium: boolean;
  @IsNotEmpty()
  readonly message: string;
  @IsNotEmpty()
  readonly coins: number;
  @IsNotEmpty()
  readonly user_id: number;
}

export class UpdateGiftDto {
  @IsNotEmpty()
  @IsOptional()
  readonly colected: boolean;
}
