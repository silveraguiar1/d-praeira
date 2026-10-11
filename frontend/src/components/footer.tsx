"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const categories = [
  { name: "Biquínis", slug: "biquinis" },
  { name: "Maiôs", slug: "maios" },
  { name: "Cangas", slug: "cangas" },
  { name: "Bolsas", slug: "bolsas" },
  { name: "Acessórios", slug: "acessorios" },
  { name: "Shorts", slug: "shorts" },
];

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-16 border-t border-sand-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <img src="/logo.png" alt="d'Praieira" className="h-14 w-auto" />
          <p className="mt-4 text-sm leading-6 text-ink/60">
            Praieira | Moda Praia Casual
            <br />
            Mais que moda, um estilo de vida!
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink/50">
            Categorias
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/produtos?categoria=${c.slug}`}
                  className="text-sm text-ink/70 transition-colors hover:text-brand-600"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink/50">
            Fale conosco
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            <li>
              <a
                href="https://instagram.com/dpraeiraoficial"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brand-600"
              >
                @dpraeiraoficial
              </a>
            </li>
            <li>
              <a
                href="tel:+5571992108098"
                className="transition-colors hover:text-brand-600"
              >
                71 99210-8098
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sand-200 py-4">
        <p className="text-center text-xs text-ink/40">
          © {year ?? "____"} d'Praieira — Moda Praia Casual. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
}