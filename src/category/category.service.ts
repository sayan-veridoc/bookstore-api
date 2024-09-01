import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private catregoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await this.catregoryRepository.create(createCategoryDto);

    await this.catregoryRepository.save(category);
    return category;
  }

  async findAll(): Promise<{ categories: Category[] }> {
    const categories = await this.catregoryRepository.find();
    return { categories };
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.catregoryRepository.findOne({ where: { id } });

    if (category) {
      return category;
    }

    throw new HttpException('Category does not exist.', HttpStatus.NOT_FOUND);
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);
    const updatedCategory = {
      ...category,
      ...updateCategoryDto,
    };
    await this.catregoryRepository.save(updatedCategory);
    return updatedCategory;
  }

  async remove(id: number): Promise<void> {
    await this.catregoryRepository.delete(id);
  }
}
