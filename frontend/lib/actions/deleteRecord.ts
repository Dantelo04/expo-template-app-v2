import AsyncStorage from "@react-native-async-storage/async-storage";
import { debounce } from "lodash";
import { Record } from "./createRecord";
import { deleteManyRecordsServer, deleteRecordServer } from "@/api/deleteRecordServer";

export const deleteRecord = async (id: string) => {
  const records = await AsyncStorage.getItem("records");
  const parsedRecords = records ? JSON.parse(records) : [];
  const filteredRecords = parsedRecords.filter((record: Record) => record.id !== id);
  await AsyncStorage.setItem("records", JSON.stringify(filteredRecords));
};

export const deleteRecordFromServer = async (id: string) => {
  await deleteRecordServer(id);
};