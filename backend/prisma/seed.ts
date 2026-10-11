import { resolve } from 'node:path';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../src/generated/prisma/client';

const dbUrl = `file:${resolve(process.cwd(), 'prisma', 'dev.db')}`;
const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: dbUrl }),
});

const categories = [
  {
    name: 'Biquínis',
    slug: 'biquinis',
    description: 'Conforto e estilo para os seus dias de sol',
    image: '/images/products/bikini-01.svg',
  },
  {
    name: 'Maiôs',
    slug: 'maios',
    description: 'Cobertura e elegância na medida certa',
    image: '/images/products/maio-01.svg',
  },
  {
    name: 'Cangas',
    slug: 'cangas',
    description: 'Estampas que abraçam o verão',
    image: '/images/products/canga-01.svg',
  },
  {
    name: 'Bolsas',
    slug: 'bolsas',
    description: 'Leve tudo o que precisa para a praia',
    image: '/images/products/bolsa-01.svg',
  },
  {
    name: 'Acessórios',
    slug: 'acessorios',
    description: 'Chapéus e detalhes que completam o look',
    image: '/images/products/chapeu-01.svg',
  },
  {
    name: 'Shorts',
    slug: 'shorts',
    description: 'Praia e dia a dia com a mesma leveza',
    image: '/images/products/shorts-01.svg',
  },
];

const products = [
  {
    name: 'Biquíni Hibisco Rosa',
    slug: 'biquini-hibisco-rosa',
    description:
      'Top push-up e calcinha de modelagem média em tecido leve com estampa de hibisco. Perfeito para quem ama um rosa que vive o verão.',
    price: 129.9,
    compareAtPrice: 159.9,
    image: '/images/products/bikini-01.svg',
    sizes: 'PP;P;M;G;GG',
    stock: 24,
    featured: true,
    category: 'biquinis',
  },
  {
    name: 'Biquíni Maré Azul',
    slug: 'biquini-mare-azul',
    description:
      'Top com bojo removível e calcinha de cintura alta. Azul profundo que combina com qualquer tom de pele.',
    price: 139.9,
    image: '/images/products/bikini-02.svg',
    sizes: 'PP;P;M;G',
    stock: 18,
    featured: false,
    category: 'biquinis',
  },
  {
    name: 'Biquíni Areia Dourada',
    slug: 'biquini-areia-dourada',
    description:
      'Tom neutro e atemporal em tecido com toque aveludado. O básico que nunca sai de moda.',
    price: 119.9,
    compareAtPrice: 139.9,
    image: '/images/products/bikini-03.svg',
    sizes: 'P;M;G;GG',
    stock: 30,
    featured: false,
    category: 'biquinis',
  },
  {
    name: 'Maiô Coral',
    slug: 'maio-coral',
    description:
      'Maiô de alcinha com decote nadador e forro duplo. Cor vibrante que ilumina o visual.',
    price: 159.9,
    image: '/images/products/maio-01.svg',
    sizes: 'PP;P;M;G;GG',
    stock: 15,
    featured: true,
    category: 'maios',
  },
  {
    name: 'Maiô Tropical',
    slug: 'maio-tropical',
    description:
      'Estampa folhagem exclusiva d’Praieira em tom verde-água. Conforto e personalidade.',
    price: 169.9,
    compareAtPrice: 189.9,
    image: '/images/products/maio-02.svg',
    sizes: 'P;M;G',
    stock: 12,
    featured: false,
    category: 'maios',
  },
  {
    name: 'Canga Flor de Cerejeira',
    slug: 'canga-flor-de-cerejeira',
    description:
      'Fibras macias com estampa delicada de flor de cerejeira. Vira toalha, vestido ou acessório.',
    price: 79.9,
    image: '/images/products/canga-01.svg',
    sizes: 'Único',
    stock: 40,
    featured: true,
    category: 'cangas',
  },
  {
    name: 'Canga Verão Infinito',
    slug: 'canga-vero-infinito',
    description:
      'Listras em degradê de azul e rosa. A canga que não pode faltar na mala de praia.',
    price: 89.9,
    compareAtPrice: 99.9,
    image: '/images/products/canga-02.svg',
    sizes: 'Único',
    stock: 35,
    featured: false,
    category: 'cangas',
  },
  {
    name: 'Bolsa de Palha Praiana',
    slug: 'bolsa-de-palha-praiana',
    description:
      'Trança de palha natural com alça longa. Espaçosa o suficiente para o dia inteiro de sol.',
    price: 99.9,
    image: '/images/products/bolsa-01.svg',
    sizes: 'Único',
    stock: 20,
    featured: true,
    category: 'bolsas',
  },
  {
    name: 'Bolsa Tote Beach',
    slug: 'bolsa-tote-beach',
    description:
      'Tote em lona resistente com detalhes em palha. Do mar para a cidade sem trocar de estilo.',
    price: 119.9,
    image: '/images/products/bolsa-02.svg',
    sizes: 'Único',
    stock: 16,
    featured: false,
    category: 'bolsas',
  },
  {
    name: 'Chapéu de Palha d’Praieira',
    slug: 'chapeu-de-palha-dpraeira',
    description:
      'Abas largas e fita rosa com a assinatura da marca. Proteção e charme no mesmo acessório.',
    price: 89.9,
    image: '/images/products/chapeu-01.svg',
    sizes: 'Único',
    stock: 25,
    featured: true,
    category: 'acessorios',
  },
  {
    name: 'Óculos de Sol Riviera',
    slug: 'oculos-de-sol-riviera',
    description:
      'Armação acetatada rosa com lentes UV400. O toque final do look de praia.',
    price: 109.9,
    compareAtPrice: 129.9,
    image: '/images/products/oculos-01.svg',
    sizes: 'Único',
    stock: 14,
    featured: false,
    category: 'acessorios',
  },
  {
    name: 'Shorts de Praia Maré',
    slug: 'shorts-de-praia-mare',
    description:
      'Shorts masculino em secagem rápida com cós elástico. Leve para o mar e para a rua.',
    price: 99.9,
    image: '/images/products/shorts-01.svg',
    sizes: 'P;M;G;GG',
    stock: 22,
    featured: false,
    category: 'shorts',
  },
];

const customers = [
  { name: 'Maria Souza', email: 'maria.souza@example.com', phone: '71 99999-1111', address: 'Av. Praia, 100 - Salvador/BA' },
  { name: 'João Lima', email: 'joao.lima@example.com', phone: '71 98888-2222', address: 'Rua do Sol, 45 - Salvador/BA' },
  { name: 'Ana Beatriz Rocha', email: 'ana.rocha@example.com', phone: '71 97777-3333', address: 'Travessa Maré, 12 - Salvador/BA' },
];

async function main() {
  console.log('🌊 Seed d’Praieira iniciado...');

  const createdCategories: Record<string, string> = {};
  for (const c of categories) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, description: c.description, image: c.image },
      create: c,
    });
    createdCategories[c.slug] = cat.id;
  }

  const createdProducts: Record<string, string> = {};
  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? null,
        image: p.image,
        sizes: p.sizes,
        stock: p.stock,
        featured: p.featured,
        categoryId: createdCategories[p.category],
      },
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? null,
        image: p.image,
        sizes: p.sizes,
        stock: p.stock,
        featured: p.featured,
        categoryId: createdCategories[p.category],
      },
    });
    createdProducts[p.slug] = product.id;
  }

  const createdCustomers: Record<string, string> = {};
  for (const c of customers) {
    const customer = await prisma.customer.upsert({
      where: { email: c.email },
      update: { name: c.name, phone: c.phone, address: c.address },
      create: c,
    });
    createdCustomers[c.email] = customer.id;
  }

  const orders = [
    {
      code: 'PR-2026-0001',
      status: 'DELIVERED' as const,
      customer: 'maria.souza@example.com',
      items: [
        { product: 'biquini-hibisco-rosa', quantity: 1, price: 129.9 },
        { product: 'canga-flor-de-cerejeira', quantity: 2, price: 79.9 },
      ],
    },
    {
      code: 'PR-2026-0002',
      status: 'SHIPPED' as const,
      customer: 'joao.lima@example.com',
      items: [{ product: 'shorts-de-praia-mare', quantity: 1, price: 99.9 }],
    },
    {
      code: 'PR-2026-0003',
      status: 'PENDING' as const,
      customer: 'ana.rocha@example.com',
      items: [
        { product: 'bolsa-de-palha-praiana', quantity: 1, price: 99.9 },
        { product: 'chapeu-de-palha-dpraeira', quantity: 1, price: 89.9 },
        { product: 'maio-coral', quantity: 1, price: 159.9 },
      ],
    },
  ];

  for (const o of orders) {
    const exists = await prisma.order.findUnique({ where: { code: o.code } });
    if (exists) continue;
    const total = o.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    await prisma.order.create({
      data: {
        code: o.code,
        status: o.status,
        total,
        customerId: createdCustomers[o.customer],
        items: {
          create: o.items.map((i) => ({
            productId: createdProducts[i.product],
            quantity: i.quantity,
            price: i.price,
          })),
        },
      },
    });
  }

  const counts = {
    categories: await prisma.category.count(),
    products: await prisma.product.count(),
    customers: await prisma.customer.count(),
    orders: await prisma.order.count(),
  };
  console.log('✅ Seed concluído:', counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });