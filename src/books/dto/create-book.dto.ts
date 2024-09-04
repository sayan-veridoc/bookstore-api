import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  quantity: number;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  author: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    description: 'The ID of the category to which the book belongs',
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
