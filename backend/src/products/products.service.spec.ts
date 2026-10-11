/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { FindProductsQueryDto } from './dto/find-products-query.dto';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: {
    $transaction: jest.Mock;
    product: { findMany: jest.Mock; findFirst: jest.Mock; count: jest.Mock };
  };

  beforeEach(async () => {
    prisma = {
      $transaction: jest.fn(),
      product: { findMany: jest.fn(), findFirst: jest.fn(), count: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  describe('findAll', () => {
    it('should return paginated products with meta', async () => {
      prisma.$transaction.mockResolvedValue([[{ id: 'p1' }], 1]);

      const result = await service.findAll(new FindProductsQueryDto());

      expect(result.data).toEqual([{ id: 'p1' }]);
      expect(result.meta).toEqual({
        page: 1,
        limit: 12,
        total: 1,
        totalPages: 1,
      });
      expect(prisma.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { active: true } }),
      );
    });

    it('should filter by category slug and featured', async () => {
      prisma.$transaction.mockResolvedValue([[], 0]);
      const query = new FindProductsQueryDto();
      query.category = 'biquinis';
      query.featured = 'true';

      await service.findAll(query);

      const call = prisma.product.findMany.mock.calls[0][0] as {
        where: { category?: { slug: string }; featured?: boolean };
      };
      expect(call.where.category).toEqual({ slug: 'biquinis' });
      expect(call.where.featured).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should find product by slug', async () => {
      const product = { id: 'p1', slug: 'biquini-hibisco-rosa' };
      prisma.product.findFirst.mockResolvedValue(product);

      await expect(service.findOne('biquini-hibisco-rosa')).resolves.toEqual(
        product,
      );
    });

    it('should throw NotFoundException when product does not exist', async () => {
      prisma.product.findFirst.mockResolvedValue(null);

      await expect(service.findOne('inexistente')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
