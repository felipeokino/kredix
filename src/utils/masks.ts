export const currencyMask = (value: string) => {
  const numbers = value.replace(/\D/g, "");

  const number = Number(numbers) / 100;

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};