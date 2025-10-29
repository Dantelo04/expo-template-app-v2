import AsyncStorage from "@react-native-async-storage/async-storage";

export const chooseMainCurrency = async (currency: string) => {
  await AsyncStorage.setItem("mainCurrency", currency);
};