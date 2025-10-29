import AsyncStorage from "@react-native-async-storage/async-storage";
import { Record } from "./createRecord";

export const updateRecord = async (record: Record) => {
  const records = await AsyncStorage.getItem("records");
  const parsedRecords = records ? JSON.parse(records) : [];
  const filteredRecords = parsedRecords.filter((existingRecord: Record) => existingRecord.id !== record.id);
  filteredRecords.push(record);
  await AsyncStorage.setItem("records", JSON.stringify(filteredRecords));
};