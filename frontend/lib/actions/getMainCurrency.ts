import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMainCurrency = async () => {
  const mainCurrency = await AsyncStorage.getItem("mainCurrency");
  return mainCurrency;
};