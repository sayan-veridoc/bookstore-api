import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  username: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  phone_no: string;
}
