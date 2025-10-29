import AsyncStorage from "@react-native-async-storage/async-storage";

export const deleteCurrency = async (currency: string) => {
  const currencies = await AsyncStorage.getItem("currencies");
  const parsedCurrencies = currencies ? JSON.parse(currencies) : [];
  const filteredCurrencies = parsedCurrencies.filter((c: string) => c !== currency);
  await AsyncStorage.setItem("currencies", JSON.stringify(filteredCurrencies));
};