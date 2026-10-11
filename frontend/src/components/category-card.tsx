import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/types";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/produtos?categoria=${category.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
        {category.image && (
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col gap-1 p-4">
        <h3 className="font-semibold text-ink transition-colors group-hover:text-brand-600">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-sm text-ink/50">{category.description}</p>
        )}
      </div>
    </Link>
  );
}