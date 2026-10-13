const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** 37.9 → "R$ 37,90" (com espaço não separável: "R$" nunca quebra sozinho) */
export function formatPrice(value: number) {
  return brl.format(value).replace(/\s/g, " ");
}

/** Evita erros de ponto flutuante em subtrações de preço (29.9 - 9.9). */
export function priceDiff(a: number, b: number) {
  return Math.round((a - b) * 100) / 100;
}
