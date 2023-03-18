import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

enum APP_PLATFORM {
  ANDROID = 'android',
  IOS = 'ios',
}

export class AppInfoDto {
  @IsNotEmpty()
  readonly bundle: number;

  @IsNotEmpty()
  readonly version: string;

  @IsNotEmpty()
  @IsEnum(APP_PLATFORM, {
    message: 'platform must be either android or ios',
  })
  readonly platform: string;

  @IsNotEmpty()
  readonly state: boolean;
}

export class UpdateAppInfoDto {
  @IsNotEmpty()
  @IsOptional()
  readonly bundle: number;

  @IsNotEmpty()
  @IsOptional()
  readonly version: string;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(APP_PLATFORM, {
    message: 'platform must be either android or ios',
  })
  readonly platform: string;

  @IsNotEmpty()
  @IsOptional()
  readonly state: boolean;
}
