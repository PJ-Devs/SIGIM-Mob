/**
 * Formats a number as a currency string based on the specified locale and currency.
 *
 * @param value - The numeric value to format as currency.
 * @param locale - The locale string to use for formatting (default is "es-CO").
 * @param currency - The currency code to use for formatting (default is "COP").
 * @returns The formatted currency string.
 * @throws Will throw an error if the value is not a valid number.
 */
export const showCurrency = (
  value: number,
  locale: string = "es-CO",
  currency: string = "COP"
): string => {
  if (typeof value !== "number") {
    throw new Error("The value must be a valid number.");
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: currency === "COP" ? 0 : 2, // Remove decimals if currency is COP
  }).format(value);
};
