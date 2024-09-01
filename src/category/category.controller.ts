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
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@/auth/guard';
import { RolesGuard } from '@/auth/guard/roles.guard';
import { Roles } from '@/decorators';
import { Role } from '@/enum/roles.enum';

@Controller('category')
@ApiTags('booksCategory')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  // @Roles(Role.Admin)
  // @UseGuards(JwtGuard, RolesGuard)
  // @ApiBearerAuth()
  @Get('allCategory')
  async findAll() {
    return await this.categoryService.findAll();
  }

  // @Roles(Role.Admin)
  // @UseGuards(JwtGuard, RolesGuard)
  // @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.categoryService.findOne(+id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(+id);
  }
}
