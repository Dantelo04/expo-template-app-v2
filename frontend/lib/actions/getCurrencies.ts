import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCurrencies = async (userCurrency?: string[] | null) => {
  const currencies = await AsyncStorage.getItem("currencies");
  
  if (!currencies || currencies.length === 0 || currencies === "[]") {
    const initialCurrencies = userCurrency ? userCurrency : [];
    await AsyncStorage.setItem("currencies", JSON.stringify(initialCurrencies));
    return initialCurrencies;
  }
  
  const parsedCurrencies = JSON.parse(currencies);
  
  return parsedCurrencies;
};