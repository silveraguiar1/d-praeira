/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let prisma: {
    product: { findMany: jest.Mock };
    customer: { upsert: jest.Mock };
    order: { count: jest.Mock; create: jest.Mock };
  };

  const customer = { id: 'c1', email: 'maria@example.com', name: 'Maria' };

  beforeEach(async () => {
    prisma = {
      product: { findMany: jest.fn() },
      customer: { upsert: jest.fn() },
      order: { count: jest.fn(), create: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  function buildDto() {
    const dto = new CreateOrderDto();
    dto.customer = { name: 'Maria', email: 'maria@example.com' };
    dto.items = [{ productId: 'p1', quantity: '2' }];
    return dto;
  }

  it('should create an order with computed total and code', async () => {
    prisma.product.findMany.mockResolvedValue([
      { id: 'p1', name: 'Biquíni', price: 100, stock: 10, active: true },
    ]);
    prisma.customer.upsert.mockResolvedValue(customer);
    prisma.order.count.mockResolvedValue(0);
    const created = { id: 'o1', code: 'PR-2026-0001', total: 200 };
    prisma.order.create.mockResolvedValue(created);

    const order = await service.create(buildDto());

    expect(order).toEqual(created);
    const data = (
      prisma.order.create.mock.calls[0][0] as {
        data: {
          total: number;
          items: {
            create: { productId: string; quantity: number; price: number }[];
          };
        };
      }
    ).data;
    expect(data.total).toBe(200);
    expect(data.items.create).toEqual([
      { productId: 'p1', quantity: 2, price: 100 },
    ]);
  });

  it('should reject order when product is missing', async () => {
    prisma.product.findMany.mockResolvedValue([]);

    await expect(service.create(buildDto())).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should reject order when stock is insufficient', async () => {
    prisma.product.findMany.mockResolvedValue([
      { id: 'p1', name: 'Biquíni', price: 100, stock: 1, active: true },
    ]);

    await expect(service.create(buildDto())).rejects.toThrow(
      /Estoque insuficiente/,
    );
  });
});
