import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  @ApiProperty()
  oldPassword: string;

  @IsString()
  @MinLength(6)
  @ApiProperty()
  newPassword: string;
}
