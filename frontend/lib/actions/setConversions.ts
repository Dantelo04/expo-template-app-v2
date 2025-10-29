import AsyncStorage from "@react-native-async-storage/async-storage";

export const setConversions = async (conversions: Record<string, number> | null) => {
  await AsyncStorage.setItem("conversions", JSON.stringify(conversions));
};

export const setConversionsByDate = async (
  conversions: Record<string, number>,
  date: string,
  primaryCurrency: string
) => {
  await AsyncStorage.setItem(`conversions-${date}-${primaryCurrency}`, JSON.stringify(conversions));
};