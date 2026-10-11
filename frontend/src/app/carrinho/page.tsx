"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";

export default function CarrinhoPage() {
  const { items, total, setQuantity, remove, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-ink">Seu carrinho está vazio</h1>
        <p className="mt-3 text-ink/60">
          Que tal explorar a coleção e encontrar o look perfeito?
        </p>
        <Link
          href="/produtos"
          className="mt-8 inline-block rounded-full bg-brand-500 px-8 py-3 font-semibold text-white shadow-md hover:bg-brand-600"
        >
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-ink">Carrinho</h1>
        <button
          type="button"
          onClick={clear}
          className="text-sm font-medium text-ink/50 hover:text-brand-600"
        >
          Limpar carrinho
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 rounded-2xl border border-sand-200 bg-white p-4"
            >
              <Link
                href={`/produtos/${product.slug}`}
                className="relative block h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-sand-100"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/produtos/${product.slug}`}
                      className="font-semibold text-ink hover:text-brand-600"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-ink/40">
                      {product.category.name}
                      {product.sizes ? ` · ${product.sizes.split(";")[0]}` : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(product.id)}
                    className="text-sm text-ink/40 hover:text-brand-600"
                    aria-label={`Remover ${product.name}`}
                  >
                    Remover
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-full border border-sand-300">
                    <button
                      type="button"
                      onClick={() => setQuantity(product.id, quantity - 1)}
                      className="px-3 py-1 text-ink/60 hover:text-ink"
                      aria-label="Diminuir"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(product.id, Math.min(product.stock, quantity + 1))
                      }
                      className="px-3 py-1 text-ink/60 hover:text-ink"
                      aria-label="Aumentar"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold text-ink">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-sand-200 bg-white p-6">
          <h2 className="text-lg font-bold text-ink">Resumo do pedido</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink/60">Subtotal</dt>
              <dd className="font-semibold">{formatPrice(total)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink/60">Frete</dt>
              <dd className="font-semibold text-brand-600">Grátis</dd>
            </div>
          </dl>
          <div className="mt-4 flex justify-between border-t border-sand-200 pt-4">
            <span className="font-bold text-ink">Total</span>
            <span className="text-xl font-bold text-ink">
              {formatPrice(total)}
            </span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block rounded-full bg-brand-500 px-8 py-3 text-center font-semibold text-white shadow-md transition-colors hover:bg-brand-600"
          >
            Finalizar compra
          </Link>
          <Link
            href="/produtos"
            className="mt-3 block text-center text-sm font-medium text-ink/50 hover:text-brand-600"
          >
            Continuar comprando
          </Link>
        </aside>
      </div>
    </div>
  );
}