"use client";

import { useEffect, useState } from "react";
import { apiFetch, buildProductsQuery } from "@/lib/api";
import type { Category, Product, ProductListResponse } from "@/lib/types";
import ProductCard from "@/components/product-card";

export default function ProdutosPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("categoria");
    if (cat) setCategory(cat);
    apiFetch<Category[]>("/categories")
      .then(setCategories)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(
      () => {
        setLoading(true);
        setError(null);
        apiFetch<ProductListResponse>(
          `/products${buildProductsQuery({
            category: category ?? undefined,
            search: search.trim() || undefined,
            limit: 48,
          })}`,
          { signal: controller.signal },
        )
          .then((res) => setProducts(res.data))
          .catch((err: unknown) => {
            if (!controller.signal.aborted) {
              setError(err instanceof Error ? err.message : "Erro ao carregar");
            }
          })
          .finally(() => {
            if (!controller.signal.aborted) setLoading(false);
          });
      },
      search ? 250 : 0,
    );
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [category, search]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ink">Produtos</h1>
        <p className="mt-1 text-ink/60">
          Coleção completa de moda praia casual
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar produtos..."
          className="w-full max-w-md rounded-full border border-sand-300 bg-white px-5 py-2.5 text-sm outline-none transition-colors focus:border-brand-400"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              category === null
                ? "bg-brand-500 text-white"
                : "bg-white text-ink/70 hover:bg-sand-100"
            }`}
          >
            Todos
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.slug)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                category === c.slug
                  ? "bg-brand-500 text-white"
                  : "bg-white text-ink/70 hover:bg-sand-100"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-80 animate-pulse rounded-2xl bg-sand-200"
            />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 text-center">
          <p className="font-semibold text-brand-700">
            Não foi possível carregar os produtos
          </p>
          <p className="mt-1 text-sm text-brand-600">
            {error} — verifique se o backend está rodando em{" "}
            <code className="rounded bg-white px-1">http://localhost:3001</code>
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-sand-200 bg-white p-10 text-center">
          <p className="font-semibold text-ink">Nenhum produto encontrado</p>
          <p className="mt-1 text-sm text-ink/50">
            Tente ajustar a busca ou os filtros
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}