const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
    ...init,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    let message = `Erro ${res.status}`;
    try {
      const parsed = JSON.parse(body);
      if (parsed?.message) {
        message = Array.isArray(parsed.message)
          ? parsed.message.join(", ")
          : parsed.message;
      }
    } catch {
      if (body) message = body;
    }
    throw new Error(message);
  }
  return (await res.json()) as T;
}

export interface ProductQuery {
  category?: string;
  search?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export function buildProductsQuery(query: ProductQuery = {}): string {
  const qs = new URLSearchParams();
  if (query.category) qs.set("category", query.category);
  if (query.search) qs.set("search", query.search);
  if (query.featured !== undefined) {
    qs.set("featured", String(query.featured));
  }
  if (query.page) qs.set("page", String(query.page));
  if (query.limit) qs.set("limit", String(query.limit));
  const str = qs.toString();
  return str ? `?${str}` : "";
}