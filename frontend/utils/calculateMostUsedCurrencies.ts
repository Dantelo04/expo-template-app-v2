export const calculateMostUsedCurrencies = async (
  limit: number = 3,
  records: Record<string, any>[] = [],
  mainCurrency: string = "usd"
): Promise<string[]> => {
  if (records.length === 0) return [];

  const currencies = records.map(
    (record: Record<string, any>) => record.currency !== mainCurrency && record.currency
  ).filter((currency) => currency !== false);
  
  const currencyCount = currencies.reduce((acc, currency) => {
    acc[currency] = (acc[currency] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedCurrencies = Object.entries(
    currencyCount as Record<string, number>
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([currency]) => currency);
  return sortedCurrencies;
};
