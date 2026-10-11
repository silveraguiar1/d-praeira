import { resolve } from 'node:path';
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// O banco SQLite vive em prisma/dev.db (caminho absoluto a partir da raiz do backend)
const dbUrl = `file:${resolve(process.cwd(), 'prisma', 'dev.db')}`;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: dbUrl,
  },
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
});