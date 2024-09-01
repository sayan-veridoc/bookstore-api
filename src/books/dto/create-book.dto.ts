import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
