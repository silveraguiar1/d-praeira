"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/cart-context";

const links = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/sobre", label: "Sobre" },
];

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M6 8h12l-1.2 12.2a1.5 1.5 0 0 1-1.5 1.3H8.7a1.5 1.5 0 0 1-1.5-1.3L6 8Z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label="d'Praieira - Início">
          <img src="/logo.png" alt="d'Praieira" className="h-11 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "text-brand-600"
                    : "text-ink/70 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://instagram.com/dpraeiraoficial"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram d'Praieira"
            className="rounded-full p-2 text-ink/70 transition-colors hover:bg-sand-100 hover:text-ink"
          >
            <InstagramIcon />
          </a>
          <Link
            href="/carrinho"
            aria-label="Carrinho de compras"
            className="relative rounded-full p-2 text-ink/70 transition-colors hover:bg-sand-100 hover:text-ink"
          >
            <CartIcon />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="flex items-center justify-center gap-6 border-t border-sand-200 px-4 py-2 md:hidden">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium ${
                active ? "text-brand-600" : "text-ink/70"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}