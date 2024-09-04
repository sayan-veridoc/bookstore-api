import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

class BookOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  bookId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookOrderDto)
  @ApiProperty({ type: [BookOrderDto] })
  books: BookOrderDto[];
}
