import AsyncStorage from '@react-native-async-storage/async-storage';

export type Record = {
  id: string;
  amount: number;
  date: string;
  title: string;
  type: "income" | "expense";
  category?: string;
  userId: string;
  currency: string;
  wallet?: string;
  createdAt: string;
};

export const createRecord = async (record: Record) => {
  const records = await AsyncStorage.getItem("records");
  const parsedRecords = records ? JSON.parse(records) : [];
  parsedRecords.push(record);
  await AsyncStorage.setItem("records", JSON.stringify(parsedRecords));
};