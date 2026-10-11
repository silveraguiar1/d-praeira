import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { products: true } } },
    });
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        products: { where: { active: true }, include: { category: false } },
      },
    });
    if (!category) {
      throw new NotFoundException(`Categoria "${slug}" não encontrada`);
    }
    return category;
  }
}
