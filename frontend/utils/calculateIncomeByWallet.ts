import { Record } from "@/lib/actions/createRecord";
import { getConversions } from "@/lib/actions/getConversions";
import { pieDataItem } from "react-native-gifted-charts";

export interface IncomeByWalletData {
  value: number;
  text: string;
  color: string;
  percentage: number;
}

export interface BalanceByWalletData {
  value: number;
  text: string;
  color: string;
  percentage: number;
}

const colors = ["#bbe6d2", "#fdd4b4", "#d1dbeb", "#f5d0e7", "#F5F0DB"];

export const calculateIncomeByWallet = async (mainCurrency: string | null, records: Record[]): Promise<
  pieDataItem[]
> => {
  try {
    const conversions = await getConversions(mainCurrency || "usd");

    if (!records || records.length === 0) {
      return [];
    }

    const incomeByWallet: { [label: string]: number } = {};

    records
      .filter((record) => record.type === "income")
      .forEach((record) => {
        const label = record.wallet || "Uncategorized";
        const conversion = conversions[record.currency] || 1;
        incomeByWallet[label] =
          (incomeByWallet[label] || 0) + (record.amount / conversion);
      });

    const totalIncome = Object.values(incomeByWallet).reduce((acc, curr) => acc + curr, 0);
    const data = Object.entries(incomeByWallet)
      .map(([label, value], index) => (
        {
        value,
        text: label,
        percentage: (value / totalIncome) * 100,
      }))
      .sort((a, b) => (b.value / totalIncome) - (a.value / totalIncome)) as pieDataItem[];
      
    data.map((item, index) => item.color = colors[index]).slice(0, 4);
    return data.slice(0, 4);
  } catch (error) {
    console.error("Error calculating income by wallet:", error);
    return [];
  }
};

export const calculateBalanceByWallet = async (mainCurrency: string | null, records: Record[]): Promise<
  pieDataItem[]
> => {
  try {
    const conversions = await getConversions(mainCurrency || "usd");

    if (!records || records.length === 0) {
      return [];
    }

    const balanceByWallet: { [label: string]: { income: number; expenses: number; balance: number } } = {};

    records.forEach((record) => {
      const label = record.wallet || "Uncategorized";
      const conversion = conversions[record.currency] || 1;
      const convertedAmount = record.amount / conversion;

      if (!balanceByWallet[label]) {
        balanceByWallet[label] = { income: 0, expenses: 0, balance: 0 };
      }

      if (record.type === "income") {
        balanceByWallet[label].income += convertedAmount;
      } else {
        balanceByWallet[label].expenses += convertedAmount;
      }
    });

    Object.keys(balanceByWallet).forEach(label => {
      balanceByWallet[label].balance = balanceByWallet[label].income - balanceByWallet[label].expenses;
    });

    const totalBalance = Object.values(balanceByWallet).reduce((acc, curr) => acc + curr.balance, 0);
    
    const data = Object.entries(balanceByWallet)
      .map(([label, walletData], index) => ({
        value: walletData.balance,
        text: label,
        percentage: totalBalance !== 0 ? (walletData.balance / Math.abs(totalBalance)) * 100 : 0,
      }))
      .sort((a, b) => Math.abs(b.value) - Math.abs(a.value)) as pieDataItem[];
      
    data.forEach((item, index) => item.color = colors[index % colors.length]);
    return data.slice(0, 4);
  } catch (error) {
    console.error("Error calculating balance by wallet:", error);
    return [];
  }
};

