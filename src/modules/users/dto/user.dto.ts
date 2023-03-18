import { IsNotEmpty, IsEmail, MinLength, IsUrl } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly username: string;
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly phone: string;
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}
