import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Cupon } from '../cupon.entity';
// import {

// } from '@nestjs/common';

export class CuponDto extends PartialType(Cupon) {
  @IsNotEmpty()
  readonly coins: number;
  @IsNotEmpty()
  @IsOptional()
  readonly premium: boolean;
}

export class UpdateCuponDto {
  @IsNotEmpty()
  @IsOptional()
  readonly used: boolean;
  @IsNotEmpty()
  @IsOptional()
  readonly user_id: number;
}
