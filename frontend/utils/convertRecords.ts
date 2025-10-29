import { Record } from "@/lib/actions/createRecord";
import { getConversions } from "@/lib/actions/getConversions";

export const convertRecords = async (
  records: Record[],
  mainCurrency: string
) => {
  const conversions = await getConversions(mainCurrency);
  return records.map((record) => ({
    ...record,
    amount: record.amount / (conversions[record.currency] || 1),
  }));
};

export const convertSingleRecord = async (record: Record, mainCurrency: string) => {
  const conversions = await getConversions(mainCurrency);
  return {
    ...record,
    amount: record.amount / (conversions[record.currency] || 1),
  };
};
