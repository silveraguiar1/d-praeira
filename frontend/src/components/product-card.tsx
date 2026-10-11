"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/produtos/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-sand-100"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.compareAtPrice && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
            Oferta
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium uppercase tracking-wider text-ink/40">
          {product.category.name}
        </span>
        <Link
          href={`/produtos/${product.slug}`}
          className="font-semibold leading-snug text-ink transition-colors hover:text-brand-600"
        >
          {product.name}
        </Link>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-lg font-bold text-ink">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-ink/40 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => add(product, 1)}
          className="mt-3 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}