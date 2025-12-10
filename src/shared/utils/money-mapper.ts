export const MoneyMapper = (value: number, locale: string, currency: string): string => {
  return value.toLocaleString(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}