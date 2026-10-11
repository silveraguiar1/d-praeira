import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { resolve } from 'node:path';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const dbUrl = `file:${resolve(process.cwd(), 'prisma', 'dev.db')}`;
    super({ adapter: new PrismaBetterSqlite3({ url: dbUrl }) });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
