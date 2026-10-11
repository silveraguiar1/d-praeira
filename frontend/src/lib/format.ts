export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function parseSizes(sizes: string | null): string[] {
  if (!sizes) return [];
  return sizes.split(";").map((s) => s.trim()).filter(Boolean);
}