import { Role } from '@/enum/roles.enum';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  phone_no?: string;

  @IsEnum(Role)
  roles?: Role;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  resetToken?: string;

  @IsString()
  resetTokenTime?: string;
}
