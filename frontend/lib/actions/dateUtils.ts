import AsyncStorage from "@react-native-async-storage/async-storage";

const LAST_UPDATE_KEY = "conversions_last_update";

export const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getLastUpdateDate = async (): Promise<string | null> => {
  try {
    const lastUpdate = await AsyncStorage.getItem(LAST_UPDATE_KEY);
    return lastUpdate;
  } catch (error) {
    console.error("Error getting last update date:", error);
    return null;
  }
};

export const setLastUpdateDate = async (date?: string): Promise<void> => {
  try {
    const updateDate = date || getTodayDate();
    await AsyncStorage.setItem(LAST_UPDATE_KEY, updateDate);
  } catch (error) {
    console.error("Error setting last update date:", error);
  }
};

export const needsDailyUpdate = async (): Promise<boolean> => {
  try {
    const lastUpdate = await getLastUpdateDate();
    const today = getTodayDate();
    
    if (!lastUpdate) {
      return true;
    }
    
    return lastUpdate !== today;
  } catch (error) {
    console.error("Error checking if daily update is needed:", error);
    return true;
  }
};

export const isConversionsOlderThanDays = async (days: number): Promise<boolean> => {
  try {
    const lastUpdate = await getLastUpdateDate();
    if (!lastUpdate) {
      return true;
    }
    
    const lastUpdateDate = new Date(lastUpdate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastUpdateDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays >= days;
  } catch (error) {
    console.error("Error checking conversion age:", error);
    return true;
  }
};

export const clearLastUpdateDate = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(LAST_UPDATE_KEY);
  } catch (error) {
    console.error("Error clearing last update date:", error);
  }
};

export const getDaysSinceLastUpdate = async (): Promise<number> => {
  try {
    const lastUpdate = await getLastUpdateDate();
    if (!lastUpdate) {
      return -1;
    }
    
    const lastUpdateDate = new Date(lastUpdate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastUpdateDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  } catch (error) {
    console.error("Error getting days since last update:", error);
    return -1;
  }
};
