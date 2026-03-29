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
