import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class NewsDto {
  @IsNotEmpty()
  readonly active: boolean;
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly body: string;
}

export class UpdateNewsDto {
  @IsNotEmpty()
  @IsOptional()
  readonly active: boolean;
  @IsNotEmpty()
  @IsUrl()
  @IsOptional()
  readonly image: string;
  @IsNotEmpty()
  @IsOptional()
  readonly title: string;
  @IsNotEmpty()
  @IsOptional()
  readonly body: string;
}
