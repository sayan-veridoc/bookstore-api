import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  phone_no?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  resetToken?: string;

  @IsString()
  resetTokenTime?: string;
}
