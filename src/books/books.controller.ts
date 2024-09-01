import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@/auth/guard';
import { RolesGuard } from '@/auth/guard/roles.guard';

import { Role } from '@/enum/roles.enum';
import { Roles } from '@/decorators';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Post('create')
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.create(createBookDto);
  }

  // @Roles(Role.Admin)
  // @UseGuards(JwtGuard, RolesGuard)
  // @ApiBearerAuth()
  @Get('allBooks')
  async findAll() {
    return await this.booksService.findAll();
  }

  // @Roles(Role.Admin)
  // @UseGuards(JwtGuard, RolesGuard)
  // @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.booksService.findOne(+id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return await this.booksService.update(+id, updateBookDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.booksService.remove(+id);
  }
}
