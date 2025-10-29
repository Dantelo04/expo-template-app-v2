import { Expense } from "@/screens/Expense/Expense";
import { useLocalSearchParams } from "expo-router";
import { useRecords } from "@/context/RecordsContext";

export default function EditExpenseScreen() {
  const { recordId } = useLocalSearchParams();
  const { records, programmedRecords, recurrentRecords } = useRecords();
  const allRecords = [...(records || []), ...(programmedRecords || []), ...(recurrentRecords || [])];
  const record = allRecords?.find((record) => record.id === recordId);

  return <Expense record={record} />;
}