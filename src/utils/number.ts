export const formatCurrency = (
  amount: number,
  sign: "auto" | "never" | "always" | "exceptZero" = "auto",
) => {
  return new Intl.NumberFormat("pt-BR", {
    signDisplay: sign,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);
};

export const parseCurrency = (value: string): number => {
  const num = parseFloat(value.replace(/[^0-9.-]+/g, ""));
  return isNaN(num) ? 0 : num;
}