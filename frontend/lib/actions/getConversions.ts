import AsyncStorage from "@react-native-async-storage/async-storage";
import { setConversions, setConversionsByDate } from "./setConversions";
import { needsDailyUpdate, setLastUpdateDate, getTodayDate } from "./dateUtils";

export const forceUpdateConversions = async (primaryCurrency: string) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const data = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${primaryCurrency}.json`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);
    
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    
    const json = await data.json();
    
    if (!json || !json[primaryCurrency]) {
      throw new Error(`Invalid response format for currency: ${primaryCurrency}`);
    }
    
    await setConversions(json);
    await setLastUpdateDate();
    
    return json[primaryCurrency];
  } catch (error: any) {
    console.error("Error in forceUpdateConversions:", error.message || error);
    return { [primaryCurrency]: 1 };
  }
};

export const getConversions = async (primaryCurrency: string) => {
  try {
    const needsUpdate = await needsDailyUpdate();

    const conversions = await AsyncStorage.getItem("conversions");
    let parsedConversions: Record<string, any> = {};

    if (
      conversions !== null &&
      conversions !== undefined &&
      conversions !== "null"
    ) {
      try {
        parsedConversions = JSON.parse(conversions);
      } catch (parseError) {
        console.error("Error parsing cached conversions:", parseError);
        parsedConversions = {};
      }
    }

    if (
      needsUpdate ||
      !conversions ||
      conversions === null ||
      parsedConversions[primaryCurrency] === undefined ||
      parsedConversions[primaryCurrency] === null
    ) {
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      try {
        const data = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${primaryCurrency}.json`,
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);
        
        if (!data.ok) {
          throw new Error(`HTTP error! status: ${data.status}`);
        }
        
        const json = await data.json();
        
        if (!json || !json[primaryCurrency]) {
          throw new Error(`Invalid response format for currency: ${primaryCurrency}`);
        }
        
        await setConversions(json);
        await setLastUpdateDate();

        return json[primaryCurrency];
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        console.error("Error fetching conversions:", fetchError.message);
        
        if (parsedConversions[primaryCurrency]) {
          return parsedConversions[primaryCurrency];
        }
        
        console.warn("No cached data available, returning fallback conversions");
        return { [primaryCurrency]: 1 };
      }
    } else {
      return parsedConversions[primaryCurrency];
    }
  } catch (error: any) {
    console.error("Critical error in getConversions:", error.message || error);
    return { [primaryCurrency]: 1 };
  }
};

//Date format: YYYY-MM-DD
export const getConversionsByDate = async (
  primaryCurrency: string,
  date: string
) => {
  const today = getTodayDate();
  
  const requestDate = date >= today && date !== "latest" ? today : date;
  
  try {
    const conversions = await AsyncStorage.getItem(
      `conversions-${requestDate}-${primaryCurrency}`
    );

    if (!conversions) {
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      try {
        const data = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${requestDate}/v1/currencies/${primaryCurrency}.json`,
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);
        
        if (!data.ok) {
          throw new Error(`HTTP error! status: ${data.status}`);
        }
        
        const json = await data.json();
        
        if (!json || !json[primaryCurrency]) {
          throw new Error(`Invalid response format for currency: ${primaryCurrency}`);
        }
        
        await setConversionsByDate(json, requestDate, primaryCurrency);
        return json[primaryCurrency];
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        console.error(`Error fetching conversions for ${requestDate}:`, fetchError.message);
        
        const fallbackConversions = await getConversions(primaryCurrency);
        return fallbackConversions;
      }
    } else {
      let parsedConversions: Record<string, any> = {};
      if (
        conversions !== null &&
        conversions !== undefined &&
        conversions !== "null"
      ) {
        try {
          parsedConversions = JSON.parse(conversions);
        } catch (parseError) {
          console.error("Error parsing cached date conversions:", parseError);
          return { [primaryCurrency]: 1 };
        }
      }
      return parsedConversions[primaryCurrency] || { [primaryCurrency]: 1 };
    }
  } catch (error: any) {
    console.error(`Critical error in getConversionsByDate for ${requestDate}:`, error.message || error);
    return { [primaryCurrency]: 1 };
  }
};
