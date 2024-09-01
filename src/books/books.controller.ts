import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard, RolesGuard } from '@/auth/guard';
import { Role } from '@/enum/roles.enum';
import { Roles } from '@/decorators';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Post('uploadThumbnail/:id')
  @UseInterceptors(FileInterceptor('file'))
  async UploadThumbnail(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.booksService.uploadThumbnail(+id, file);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Delete('deleteThumbnail/:id')
  deletePhoto(@Param('id') id: number) {
    return this.booksService.deleteThumbnail(+id);
  }

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

  @Get('getByCategory/:id')
  async findByCategory(@Param('id') id: number) {
    return await this.booksService.findAllByCategory(+id);
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
