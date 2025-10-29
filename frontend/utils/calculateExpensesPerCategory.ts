import { Record } from "@/lib/actions/createRecord";
import { getConversions } from "@/lib/actions/getConversions";
import { pieDataItem } from "react-native-gifted-charts";

export interface ExpenseByCategory {
  value: number;
  text: string;
  color: string;
  percentage: number;
}

const colors = ["#bbe6d2", "#fdd4b4", "#d1dbeb", "#f5d0e7", "#F5F0DB"];

export const calculateExpensesPerCategory = async (mainCurrency: string | null, records: Record[], selectedReportCategories?: string[]): Promise<
  pieDataItem[]
> => {
  try {
    const conversions = await getConversions(mainCurrency || "usd");

    if (!records || records.length === 0) {
      return [];
    }

    const expensesByCategory: { [label: string]: number } = {};

    records
      .filter((record) => record.type === "expense" && (selectedReportCategories?.includes(record.category || "") || !selectedReportCategories?.length))
      .forEach((record) => {
        const label = record.category || "Uncategorized";
        const conversion = conversions[record.currency] || 1;
        expensesByCategory[label] =
          (expensesByCategory[label] || 0) + (record.amount / conversion);
      });

    const totalExpenses = Object.values(expensesByCategory).reduce((acc, curr) => acc + curr, 0);
    const data = Object.entries(expensesByCategory)
      .map(([label, value], index) => (
        {
        value,
        text: label,
        percentage: (value / totalExpenses) * 100,
      }))
      .sort((a, b) => (b.value / totalExpenses) - (a.value / totalExpenses)) as pieDataItem[];
      
    data.map((item, index) => item.color = colors[index]).slice(0, 4);
    return data.slice(0, 4);
  } catch (error) {
    console.error("Error calculating expenses per category:", error);
    return [];
  }
};
