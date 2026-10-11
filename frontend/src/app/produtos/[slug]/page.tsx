"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { formatPrice, parseSizes } from "@/lib/format";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/types";

function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="h-4 w-64 animate-pulse rounded bg-sand-200" />
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-3xl bg-sand-200" />
        <div className="space-y-4 pt-4">
          <div className="h-4 w-24 animate-pulse rounded bg-sand-200" />
          <div className="h-8 w-3/4 animate-pulse rounded bg-sand-200" />
          <div className="h-6 w-32 animate-pulse rounded bg-sand-200" />
          <div className="h-24 w-full animate-pulse rounded bg-sand-200" />
        </div>
      </div>
    </div>
  );
}

function ProductDetailContent() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { add } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setProduct(null);
    setNotFound(false);
    setError(null);
    setSize(null);
    setQuantity(1);
    apiFetch<Product>(`/products/${slug}`)
      .then((p) => {
        setProduct(p);
        const sizes = parseSizes(p.sizes);
        if (sizes.length > 0) setSize(sizes[0]);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "";
        if (message.includes("404") || message.toLowerCase().includes("não encontrado")) {
          setNotFound(true);
        } else {
          setError(message || "Erro ao carregar produto");
        }
      });
  }, [slug]);

  if (notFound) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-ink">Produto não encontrado</h1>
        <p className="mt-2 text-ink/60">
          Ele pode ter saído de linha. Que tal ver a coleção completa?
        </p>
        <Link
          href="/produtos"
          className="mt-6 inline-block rounded-full bg-brand-500 px-8 py-3 font-semibold text-white hover:bg-brand-600"
        >
          Ver produtos
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-ink">
          Não foi possível carregar o produto
        </h1>
        <p className="mt-2 text-sm text-ink/60">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-3xl bg-sand-200" />
          <div className="space-y-4 pt-4">
            <div className="h-4 w-24 animate-pulse rounded bg-sand-200" />
            <div className="h-8 w-3/4 animate-pulse rounded bg-sand-200" />
            <div className="h-6 w-32 animate-pulse rounded bg-sand-200" />
            <div className="h-24 w-full animate-pulse rounded bg-sand-200" />
          </div>
        </div>
      </div>
    );
  }

  const sizes = parseSizes(product.sizes);

  function handleAdd() {
    if (!product) return;
    add(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="mb-6 text-sm text-ink/50">
        <Link href="/" className="hover:text-brand-600">
          Início
        </Link>
        {" / "}
        <Link href="/produtos" className="hover:text-brand-600">
          Produtos
        </Link>
        {" / "}
        <Link
          href={`/produtos?categoria=${product.category.slug}`}
          className="hover:text-brand-600"
        >
          {product.category.name}
        </Link>
        {" / "}
        <span className="text-ink/80">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-sand-200 bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
          {product.compareAtPrice && (
            <span className="absolute left-4 top-4 rounded-full bg-brand-500 px-4 py-1.5 text-sm font-bold text-white">
              Oferta
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium uppercase tracking-wider text-brand-600">
            {product.category.name}
          </span>
          <h1 className="mt-2 text-3xl font-bold text-ink">{product.name}</h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-lg text-ink/40 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="mt-6 leading-7 text-ink/70">{product.description}</p>

          {sizes.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-ink">Tamanho</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`min-w-12 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      size === s
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "border-sand-300 bg-white text-ink/70 hover:border-brand-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <h3 className="text-sm font-semibold text-ink">Quantidade</h3>
            <div className="flex items-center rounded-full border border-sand-300 bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 text-lg text-ink/60 hover:text-ink"
                aria-label="Diminuir quantidade"
              >
                −
              </button>
              <span className="w-10 text-center font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                className="px-4 py-2 text-lg text-ink/60 hover:text-ink"
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>
          </div>

          <p className="mt-3 text-sm text-ink/50">
            {product.stock > 0
              ? `${product.stock} em estoque`
              : "Esgotado"}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleAdd}
              disabled={product.stock < 1}
              className="flex-1 rounded-full bg-brand-500 px-8 py-3.5 font-semibold text-white shadow-md transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-sand-300"
            >
              {added ? "Adicionado!" : "Adicionar ao carrinho"}
            </button>
            <Link
              href="/carrinho"
              className="rounded-full border border-ink/15 bg-white px-8 py-3.5 font-semibold text-ink transition-colors hover:bg-sand-100"
            >
              Ver carrinho
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailContent />
    </Suspense>
  );
}