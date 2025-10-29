import { Record } from "@/lib/actions/createRecord";
import { getConversions } from "@/lib/actions/getConversions";

export const getLastMonnthBalance = async (
  records: Record[],
  primaryCurrency: string = "pyg"
) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const lastMonth = currentMonth - 1;
  const lastYear = currentYear;

  let totalIncome = 0;
  let totalExpenses = 0;

  const conversionsByDate = await getConversions(primaryCurrency);

  for (const record of records) {
    const conversion =
      record.currency !== primaryCurrency
        ? (conversionsByDate[record.currency] || 1)
        : 1;
    const recordDate = new Date(record.date);

    if (
      recordDate.getMonth() === lastMonth &&
      recordDate.getFullYear() === lastYear
    ) {
      if (record.type === "income") {
        totalIncome += record.amount / (conversion || 1);
      } else {
        totalExpenses += record.amount / (conversion || 1);
      }
    }
  }

  const totalBalance = totalIncome - totalExpenses;
  return totalBalance;
};

export const calculateTotal = async (
  records: Record[],
  primaryCurrency: string = "pyg",
  filtered?: boolean
) => {
  let totalIncome = 0;
  let totalExpenses = 0;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const lastMonthBalance = await getLastMonnthBalance(records, primaryCurrency);

  const conversionsByDate = await getConversions(primaryCurrency);

  for (const record of records) {
    const conversion =
      record.currency !== primaryCurrency
        ? (conversionsByDate[record.currency] || 1)
        : 1;
    const recordDate = new Date(record.date);

    if (filtered ? recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear : true) {
      if (record.type === "income") {
        totalIncome += record.amount / (conversion || 1);
      } else {
        totalExpenses += record.amount / (conversion || 1);
      }
    }
  }

  if (filtered) {
    totalIncome += lastMonthBalance;
  }

  const totalBalance = totalIncome - totalExpenses;
  return {
    totalIncome: totalIncome,
    totalExpenses: totalExpenses,
    totalBalance: totalBalance,
  };
};
