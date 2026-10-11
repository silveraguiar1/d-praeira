import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Prisma } from '../generated/prisma/client';
import { OrderStatus } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    const productIds = [...new Set(dto.items.map((i) => i.productId))];
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds }, active: true },
    });
    if (products.length !== productIds.length) {
      throw new BadRequestException('Produto inválido no pedido');
    }
    const byId = new Map(products.map((p) => [p.id, p]));

    const total = dto.items.reduce((sum, item) => {
      const quantity = parseInt(item.quantity, 10);
      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new BadRequestException('Quantidade inválida no pedido');
      }
      const product = byId.get(item.productId);
      if (!product || product.stock < quantity) {
        throw new BadRequestException(
          `Estoque insuficiente para ${product?.name ?? item.productId}`,
        );
      }
      return sum + product.price * quantity;
    }, 0);

    const customer = await this.prisma.customer.upsert({
      where: { email: dto.customer.email },
      update: {
        name: dto.customer.name,
        phone: dto.customer.phone ?? null,
        address: dto.customer.address ?? null,
      },
      create: {
        name: dto.customer.name,
        email: dto.customer.email,
        phone: dto.customer.phone ?? null,
        address: dto.customer.address ?? null,
      },
    });

    const year = new Date().getFullYear();
    const count = await this.prisma.order.count({
      where: { code: { startsWith: `PR-${year}-` } },
    });
    const code = `PR-${year}-${String(count + 1).padStart(4, '0')}`;

    return this.prisma.order.create({
      data: {
        code,
        total,
        customerId: customer.id,
        items: {
          create: dto.items.map((item) => ({
            productId: item.productId,
            quantity: parseInt(item.quantity, 10),
            price: byId.get(item.productId)!.price,
          })),
        },
      },
      include: { customer: true, items: { include: { product: true } } },
    });
  }

  async findAll(status?: OrderStatus) {
    const where: Prisma.OrderWhereInput = status ? { status } : {};
    return this.prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { customer: true, items: { include: { product: true } } },
    });
  }

  async findOne(idOrCode: string) {
    const order = await this.prisma.order.findFirst({
      where: { OR: [{ id: idOrCode }, { code: idOrCode }] },
      include: { customer: true, items: { include: { product: true } } },
    });
    if (!order) {
      throw new NotFoundException(`Pedido "${idOrCode}" não encontrado`);
    }
    return order;
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Pedido "${id}" não encontrado`);
    }
    return this.prisma.order.update({
      where: { id },
      data: { status: dto.status },
      include: { customer: true, items: { include: { product: true } } },
    });
  }
}
