import { Injectable, NotFoundException } from '@nestjs/common';
import type { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { FindProductsQueryDto } from './dto/find-products-query.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: FindProductsQueryDto) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const limit = Math.min(
      48,
      Math.max(1, parseInt(query.limit ?? '12', 10) || 12),
    );

    const where: Prisma.ProductWhereInput = { active: true };
    if (query.category) {
      where.category = { slug: query.category };
    }
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { description: { contains: query.search } },
      ];
    }
    if (query.featured === 'true') {
      where.featured = true;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(idOrSlug: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        active: true,
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: { category: true },
    });
    if (!product) {
      throw new NotFoundException(`Produto "${idOrSlug}" não encontrado`);
    }
    return product;
  }
}
