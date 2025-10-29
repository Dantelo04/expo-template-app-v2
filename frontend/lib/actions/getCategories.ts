import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCategories = async (userCategories?: string[] | null) => {
  const categories = await AsyncStorage.getItem("categories");
  
  if (!categories || categories.length === 0 || categories === "[]") {
    const initialCategories = userCategories ? userCategories : [];
    await AsyncStorage.setItem("categories", JSON.stringify(initialCategories));
    return initialCategories;
  }
  
  const parsedCategories = JSON.parse(categories);
  
  return parsedCategories;
};