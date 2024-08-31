import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  resetToken: string;

  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;
}
