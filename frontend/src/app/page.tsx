import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { safeApiFetch } from "@/lib/api";
import type { Category, ProductListResponse } from "@/lib/types";
import ProductCard from "@/components/product-card";
import CategoryCard from "@/components/category-card";

async function HomeSections() {
  const [categories, featured] = await Promise.all([
    safeApiFetch<Category[]>("/categories"),
    safeApiFetch<ProductListResponse>("/products?featured=true&limit=8"),
  ]);
  const featuredProducts = featured?.data ?? [];

  return (
    <>
      {categories && categories.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ink md:text-3xl">
                Nossas categorias
              </h2>
              <p className="mt-1 text-ink/60">
                Encontre o que combina com o seu verão
              </p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {featuredProducts.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-ink md:text-3xl">
                  Destaques da temporada
                </h2>
                <p className="mt-1 text-ink/60">
                  Os queridinhos que não podem faltar
                </p>
              </div>
              <Link
                href="/produtos"
                className="hidden text-sm font-semibold text-brand-600 hover:text-brand-700 sm:block"
              >
                Ver todos →
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Image
          src="/images/hero.svg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sand-50/80 via-white/30 to-sand-50" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center md:py-32">
          <img
            src="/logo.png"
            alt="d'Praieira"
            className="h-28 w-auto drop-shadow-sm md:h-36"
          />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-brand-600 md:text-sm">
            Praieira · Moda Praia Casual
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink md:text-5xl">
            Mais que moda, um estilo de vida!
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink/70">
            Biquínis, maiôs, cangas e acessórios com a leveza do litoral.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/produtos"
              className="rounded-full bg-brand-500 px-8 py-3 font-semibold text-white shadow-md transition-colors hover:bg-brand-600"
            >
              Ver coleção
            </Link>
            <a
              href="https://instagram.com/dpraeiraoficial"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink/15 bg-white/80 px-8 py-3 font-semibold text-ink transition-colors hover:bg-white"
            >
              @dpraeiraoficial
            </a>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <HomeSections />
      </Suspense>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-brand-500 px-6 py-12 text-center text-white md:py-16">
          <h2 className="max-w-xl text-2xl font-bold md:text-3xl">
            Acompanhe o dia a dia da d'Praieira
          </h2>
          <p className="max-w-md text-white/80">
            Novidades, bastidores e looks inspirados no mar, direto no seu
            feed.
          </p>
          <a
            href="https://instagram.com/dpraeiraoficial"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white px-8 py-3 font-semibold text-brand-600 shadow-md transition-transform hover:scale-105"
          >
            Seguir no Instagram
          </a>
        </div>
      </section>
    </>
  );
}