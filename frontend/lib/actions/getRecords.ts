import { getRecordsFromUser } from "@/api/getRecordsFromUser";
import { getDifferences } from "@/utils/compareArrays";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createRecord, Record } from "@/lib/actions/createRecord";
import { createRecordServer } from "@/api/createRecordServer";
import { deleteRecordFromServer } from "./deleteRecord";
import { excludeProRecords } from "@/utils/excludeProRecords";

export const getRecords = async (id?: string) => {
  try {
    const serverRecords = await getRecordsFromUser(id || "");

    const records = await AsyncStorage.getItem("records");
    let localRecords = [];

    if (!Array.isArray(serverRecords)) {
      return records ? JSON.parse(records) : [];
    }

    try {
      localRecords = records ? JSON.parse(records) : [];
    } catch (parseError) {
      console.log("Error parsing local records:", parseError);
      await AsyncStorage.setItem("records", JSON.stringify(serverRecords));

      return excludeProRecords(serverRecords);
    }

    const differences = getDifferences(localRecords, serverRecords);

    if (differences && differences.differences2.length > 0) {
      console.log(
        "Found this many differences in server: ",
        differences.differences2.length
      );

      const newRecords = [...localRecords, ...differences.differences2];

      await AsyncStorage.setItem("records", JSON.stringify(newRecords));

      return excludeProRecords(newRecords);
    }

    if (!records || records.length === 0 || records === "[]") {
      await AsyncStorage.setItem("records", JSON.stringify(serverRecords));
      return excludeProRecords(serverRecords);
    }

    if (differences && differences.differences1.length > 0) {
      console.log(
        "Found this many differences: ",
        differences.differences1.length
      );
      const newRecords = localRecords.filter(
        (record: Record) =>
          !differences.differences1.some((item) => item.id === record.id)
      );

      await addProgrammedRecords(differences.differences1, newRecords);
      await addRecurrentRecords(differences.differences1, newRecords);
      await AsyncStorage.setItem("records", JSON.stringify(newRecords));

      return excludeProRecords(newRecords);
    }

    return excludeProRecords(localRecords);
  } catch (error) {
    console.log("Error in getRecords:", error);
    return [];
  }
};

const addProgrammedRecords = async (differences: any, records: Record[]) => {
  if (!Array.isArray(differences)) {
    return;
  }

  try {
    for (const record of differences) {
      if (record && record.id && record.id.split(".")[0] === "programmed") {
        try {
          if (!records.some((r: Record) => r.id === record.id)) {
            await createRecord(record);
          }
        } catch (error) {
          console.log("Error adding programmed record:", error);
        }
      }
    }
  } catch (error) {
    console.log("Error in addProgrammedRecords:", error);
  }
};

const addRecurrentRecords = async (differences: any, records: Record[]) => {
  if (!Array.isArray(differences)) {
    return;
  }
  
  try {
    for (const record of differences) {
      if (record && record.id && record.id.split(".")[0] === "recurrent") {
        try {
          if (!records.some((r: Record) => r.id === record.id)) {
            await createRecord(record);
          }
        } catch (error) {
          console.log("Error adding recurrent record:", error);
        }
      }
    }
  } catch (error) {
    console.log("Error in addRecurrentRecords:", error);
  }
};

export const getRecordsFast = async () => {
  try {
    const records = await AsyncStorage.getItem("records");

    if (!records) {
      return null;
    }

    let parsedRecords;

    try {
      parsedRecords = JSON.parse(records);
    } catch (parseError) {
      console.log("Error parsing records in getRecordsFast:", parseError);
      return null;
    }

    if (!Array.isArray(parsedRecords)) {
      return null;
    }
    
    const updatedRecordsProgrammed = await generateProgrammedRecords(parsedRecords);
    const updatedRecordsRecurrent = await generateRecurrentRecords(parsedRecords);
    const updatedRecords = [...updatedRecordsProgrammed, ...updatedRecordsRecurrent];

    return excludeProRecords(updatedRecords);
  } catch (error) {
    console.log("Error in getRecordsFast:", error);
    return null;
  }
};

export const generateRecurrentRecords = async (records: Record[]) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  let newRecords = [];

  for (const record of records as Record[]) {
    const recordDate = new Date(record.date);
    const recordDay = recordDate.getDate() >= 29 ? 29 : recordDate.getDate();

    if (record.title.split(".")[0] === "r" && recordDay === currentDay) {
      const yyyymmdd = `${currentYear}${String(currentMonth + 1).padStart(
        2,
        "0"
      )}${String(currentDay).padStart(2, "0")}`;
      const deterministicId = `recurrent.${record.id}.${yyyymmdd}`;

      const existsById = records.some(
        (r: Record) => r.id === deterministicId
      );

      if (existsById) {
        continue;
      }

      const newRecord: Record = {
        ...record,
        title: record.title.split(".")[1],
        id: deterministicId,
        date: currentDate.toISOString(),
        createdAt: currentDate.toISOString(),
      };

      newRecords.push(newRecord);

      try {
        await createRecordServer(newRecord);
      } catch (e) {
        console.log("createRecordServer failed (possibly duplicate):", e);
      }
    }
  }

  return newRecords;
};

export const generateProgrammedRecords = async (records: Record[]) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const updatedRecords = [...records];

  for (const record of records as Record[]) {
    const recordDate = new Date(record.date);
    const recordDay = recordDate.getDate() >= 29 ? 29 : recordDate.getDate();
    const recordMonth = recordDate.getMonth();
    const recordYear = recordDate.getFullYear();

    if (record.title.split(".")[0] === "p" && recordDay === currentDay && recordMonth === currentMonth && recordYear === currentYear) {
      const yyyymmdd = `${currentYear}${String(currentMonth + 1).padStart(
        2,
        "0"
      )}${String(currentDay).padStart(2, "0")}`;
      const deterministicId = `programmed.${record.id}.${yyyymmdd}`;

      const existsById = updatedRecords.some(
        (r: Record) => r.id === deterministicId
      );

      if (existsById) {
        continue;
      }

      const newRecord: Record = {
        ...record,
        title: record.title.split(".")[1],
        id: deterministicId,
        date: currentDate.toISOString(),
        createdAt: currentDate.toISOString(),
      };

      updatedRecords.push(newRecord);

      try {
        await deleteRecordFromServer(record.id);
        await createRecordServer(newRecord);
      } catch (e) {
        console.log("createRecordServer failed (possibly duplicate):", e);
      }
    }
  }

  return updatedRecords;
};

export const getProgrammedRecords = async () => {
  try {
    const records = await AsyncStorage.getItem("records");

    if (!records) {
      return null;
    }

    let parsedRecords;
    try {
      parsedRecords = JSON.parse(records);
    } catch (parseError) {
      console.log("Error parsing records in getProgrammedRecords:", parseError);
      return null;
    }

    if (!Array.isArray(parsedRecords)) {
      return null;
    }

    return parsedRecords.filter(
      (record: Record) => record.title.split(".")[0] === "p"
    );
  } catch (error) {
    console.log("Error in getProgrammedRecords:", error);
    return null;
  }
};

export const getRecurrentRecords = async () => {
  try {
    const records = await AsyncStorage.getItem("records");

    if (!records) {
      return null;
    }

    let parsedRecords;

    try {
      parsedRecords = JSON.parse(records);
    } catch (parseError) {
      console.log("Error parsing records in getRecurrentRecords:", parseError);
      return null;
    }

    if (!Array.isArray(parsedRecords)) {
      return null;
    }

    return parsedRecords.filter(
      (record: Record) => record.title.split(".")[0] === "r"
    );
  } catch (error) {
    console.log("Error in getRecurrentRecords:", error);
    return null;
  }
};
