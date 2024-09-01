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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@/auth/guard';
import { RolesGuard } from '@/auth/guard/roles.guard';

import { Role } from '@/enum/roles.enum';
import { Roles } from '@/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseService } from '@/firebase/firebase.service';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const destination = `uploads/${Date.now()}_${file.originalname}`;
    const fileUrl = await this.firebaseService.uploadFile(file, destination);
    return { url: fileUrl };
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
