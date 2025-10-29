import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCategories } from "./getCategories";

export const addCategories = async (category: string, userCategories?: string[] | null) => {
    const categories = await getCategories(userCategories);
    
    if (!categories.includes(category)) {
        const newCategories = [...categories, category]; 
        await AsyncStorage.setItem("categories", JSON.stringify(newCategories));
    }
};