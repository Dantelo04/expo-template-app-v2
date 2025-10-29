import { Record } from "@/lib/actions/createRecord";
import { SortType } from "@/context/SortContext";
import { getConversions } from "@/lib/actions/getConversions";

export const sortRecords = async (records: Record[], sortType: SortType, mainCurrency: string) => {
  const conversions = await getConversions(mainCurrency);
  
  const recordsCopy = [...records];
  
  switch (sortType) {
    case "Date (Ascending)":
      return recordsCopy.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    case "Date (Descending)":
      return recordsCopy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    case "Amount (Ascending)":
      return recordsCopy.sort((a, b) => (a.currency !== mainCurrency ? a.amount / conversions[a.currency] : a.amount) - (b.currency !== mainCurrency ? b.amount / conversions[b.currency] : b.amount));
    case "Amount (Descending)":
      return recordsCopy.sort((a, b) => (b.currency !== mainCurrency ? b.amount / conversions[b.currency] : b.amount) - (a.currency !== mainCurrency ? a.amount / conversions[a.currency] : a.amount));
    case "Default":
      return recordsCopy;
  }
};