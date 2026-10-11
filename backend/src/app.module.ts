import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoriesModule } from './categories/categories.module';
import { HealthModule } from './health/health.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
