import { useRecords } from "@/context/RecordsContext";
import { Income } from "@/screens/Income/Income";
import { useLocalSearchParams } from "expo-router";

export default function EditIncomeScreen() {
  const { recordId } = useLocalSearchParams();
  const { records, programmedRecords, recurrentRecords } = useRecords();
  const allRecords = [...(records || []), ...(programmedRecords || []), ...(recurrentRecords || [])];
  const record = allRecords?.find((record) => record.id === recordId);

  return <Income record={record} />;
}