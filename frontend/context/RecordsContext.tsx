import React, { createContext, useContext, useRef, useState, useCallback, ReactNode, useEffect, useMemo } from "react";
import { debounce } from "lodash";
import { deleteRecord, deleteRecordFromServer } from "@/lib/actions/deleteRecord";
import { getProgrammedRecords, getRecords, getRecordsFast, getRecurrentRecords } from "@/lib/actions/getRecords";
import { createRecord, Record } from "@/lib/actions/createRecord";
import { useSession } from "./SessionProvider";
import { updateRecordServer } from "@/api/updateRecordServer";  
import { createRecordServer } from "@/api/createRecordServer";
import { router } from "expo-router";
import { updateRecord as updateRecordAction } from "@/lib/actions/updateRecord";
import { useFilter } from "./FilterContext";
import { useWallet } from "./WalletContext";

type RecordsContextType = {
  records: Record[] | null;
  allRecords: Record[] | null;
  isLoading: boolean;
  programmedRecords: Record[] | null;
  recurrentRecords: Record[] | null;
  refreshRecords: () => Promise<void>;
  enqueueDelete: (id: string) => void;
  addRecord: (record: Record) => Promise<void>;
  updateRecord: (record: Record) => Promise<void>;
  clearRecords: () => void;
};

const RecordsContext = createContext<RecordsContextType | null>(null);

export const RecordsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useSession();
  const [allRecords, setAllRecords] = useState<Record[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [programmedRecords, setProgrammedRecords] = useState<Record[] | null>(null);
  const [recurrentRecords, setRecurrentRecords] = useState<Record[] | null>(null);
  const deleteQueue = useRef<string[]>([]);
  const { setShouldUpdateDataFunction } = useFilter();
  const { selectedWallet, isShowingAllWallets } = useWallet();

  const records = useMemo(() => {
    if (!allRecords) return null;
    if (isShowingAllWallets) return allRecords;
    return allRecords.filter(record => record.wallet?.split(".")[1] === selectedWallet?.split(".")[1]);
  }, [allRecords, selectedWallet, isShowingAllWallets]);

  const processDelete = debounce(async () => {
    if (deleteQueue.current.length === 0) return;

    const idsToDelete = [...deleteQueue.current];
    deleteQueue.current = [];

    try {
      await deleteRecord(idsToDelete[0]);
      await deleteRecordFromServer(idsToDelete[0]);
      
      setAllRecords(prevRecords => {
        if (!prevRecords) return null;
        return prevRecords.filter(record => record.id !== idsToDelete[0]);
      });
      
    } catch (err) {
      console.error("Delete failed", err);
      deleteQueue.current.push(...idsToDelete);
    }
  }, 400);

  const enqueueDelete = useCallback((id: string) => {
    setAllRecords(prevRecords => {
      if (!prevRecords) return null;
      return prevRecords.filter(record => record.id !== id);
    });

    setProgrammedRecords(prevProgrammedRecords => {
      if (!prevProgrammedRecords) return null;
      return prevProgrammedRecords.filter(record => record.id !== id);
    });

    setRecurrentRecords(prevRecurrentRecords => {
      if (!prevRecurrentRecords) return null;
      return prevRecurrentRecords.filter(record => record.id !== id);
    });

    setShouldUpdateDataFunction(true);

    deleteQueue.current.push(id);
    processDelete();
  }, [processDelete]);

  const refreshRecords = useCallback(async () => {
    try {
      const fastRecords = await getRecordsFast();
      const fastProgrammedRecords = await getProgrammedRecords();
      const fastRecurrentRecords = await getRecurrentRecords();
      setProgrammedRecords(fastProgrammedRecords);
      setRecurrentRecords(fastRecurrentRecords);

      if (fastRecords) {
        setAllRecords(fastRecords);
      } else {
        setIsLoading(true);
      }

      const serverRecords = await getRecords(user?.id || "");
      const serverProgrammedRecords = await getProgrammedRecords();
      const serverRecurrentRecords = await getRecurrentRecords();
      setProgrammedRecords(serverProgrammedRecords);
      setRecurrentRecords(serverRecurrentRecords);
      setAllRecords(serverRecords);
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  const addRecord = useCallback(async (record: Record) => {
    try {
      await createRecordServer(record);
      await createRecord(record);
      
      setAllRecords(prevRecords => {
        if (!prevRecords) return [record];
        return [record, ...prevRecords];
      });

      setShouldUpdateDataFunction(true);
      router.back();
    } catch (error) {
      console.error("Error adding record:", error);
      throw error;
    } 
  }, []);

  const updateRecord = useCallback(async (record: Record) => {
    try {
      await updateRecordServer(record);
      await updateRecordAction(record);

      setAllRecords(prevRecords => {
        if (!prevRecords) return [record];
        return prevRecords.map(r => r.id === record.id ? record : r);
      });
      
      setShouldUpdateDataFunction(true);
      router.back();
    } catch (error) {
      console.error("Error updating record:", error);
      throw error;
    }
  }, []);

  const clearRecords = useCallback(() => {
    setAllRecords(null);
  }, []);

  useEffect(() => {
    if (user?.id) {
      refreshRecords();
    }
  }, [user?.id, refreshRecords]);

  const value: RecordsContextType = {
    records,
    allRecords,
    isLoading,
    programmedRecords,
    recurrentRecords,
    refreshRecords,
    enqueueDelete,
    addRecord,
    updateRecord,
    clearRecords,
  };

  return (
    <RecordsContext.Provider value={value}>
      {children}
    </RecordsContext.Provider>
  );
};

export const useRecords = () => {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error("useRecords must be used within a RecordsProvider");
  }
  return context;
};

export const useDelete = () => {
  const { enqueueDelete } = useRecords();
  return { enqueueDelete };
};
