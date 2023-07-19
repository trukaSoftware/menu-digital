export const priceToBrazilCurrency = (price: number) =>
  price.toLocaleString(`pt-BR`, {
    minimumFractionDigits: 2,
    style: `currency`,
    currency: `BRL`,
  });
