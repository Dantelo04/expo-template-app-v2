import AsyncStorage from "@react-native-async-storage/async-storage";

export const cleanConversions = async () => {
  await AsyncStorage.removeItem("conversions");
};