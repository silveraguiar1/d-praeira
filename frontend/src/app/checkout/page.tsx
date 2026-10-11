"use client";

import { useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/cart-context";
import type { Order } from "@/lib/types";

interface FormState {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  function update(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await apiFetch<Order>("/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone || undefined,
            address: form.address || undefined,
          },
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: String(i.quantity),
          })),
        }),
      });
      setOrder(res);
      clear();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Não foi possível concluir o pedido",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-100">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="h-10 w-10 text-brand-600"
            aria-hidden
          >
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-bold text-ink">Pedido confirmado!</h1>
        <p className="mt-3 text-ink/60">
          Obrigado, {order.customer.name.split(" ")[0]}! Seu pedido{" "}
          <span className="font-bold text-brand-600">{order.code}</span> foi
          recebido e será enviado para{" "}
          <span className="font-semibold">{order.customer.email}</span>.
        </p>
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-sand-200 bg-white p-6 text-left">
          <h2 className="font-semibold text-ink">Itens do pedido</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between gap-2">
                <span className="text-ink/70">
                  {item.quantity}× {item.product.name}
                </span>
                <span className="font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-sand-200 pt-3 font-bold">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
        <p className="mt-6 text-sm text-ink/50">
          Em breve entraremos em contato pelo WhatsApp para combinar a entrega.
        </p>
        <Link
          href="/produtos"
          className="mt-8 inline-block rounded-full bg-brand-500 px-8 py-3 font-semibold text-white shadow-md hover:bg-brand-600"
        >
          Continuar comprando
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-ink">
          Seu carrinho está vazio
        </h1>
        <p className="mt-3 text-ink/60">
          Adicione produtos antes de finalizar a compra.
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
      <h1 className="text-3xl font-bold text-ink">Finalizar compra</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-sand-200 bg-white p-6"
        >
          <div>
            <h2 className="text-lg font-semibold text-ink">
              Dados de entrega
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-ink/70">
                  Nome completo *
                </span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-400"
                  placeholder="Seu nome"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-ink/70">
                  E-mail *
                </span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-400"
                  placeholder="voce@email.com"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-ink/70">
                  WhatsApp
                </span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-400"
                  placeholder="71 99999-9999"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-ink/70">
                  Endereço de entrega
                </span>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-400"
                  placeholder="Rua, número, bairro, cidade/UF"
                />
              </label>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">Pagamento</h2>
            <p className="mt-2 text-sm text-ink/60">
              Pagamento combinado pelo WhatsApp na entrega — Pix ou dinheiro.
            </p>
          </div>

          {error && (
            <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm font-medium text-brand-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-brand-500 px-8 py-3.5 font-semibold text-white shadow-md transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-sand-300"
          >
            {submitting ? "Enviando pedido..." : "Confirmar pedido"}
          </button>
        </form>

        <aside className="h-fit rounded-2xl border border-sand-200 bg-white p-6">
          <h2 className="text-lg font-bold text-ink">Seu pedido</h2>
          <ul className="mt-4 space-y-3">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex justify-between gap-3 text-sm">
                <span className="text-ink/70">
                  {quantity}× {product.name}
                </span>
                <span className="shrink-0 font-semibold">
                  {formatPrice(product.price * quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-sand-200 pt-4">
            <span className="font-bold text-ink">Total</span>
            <span className="text-xl font-bold text-ink">
              {formatPrice(total)}
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}