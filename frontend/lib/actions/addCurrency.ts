import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrencies } from "./getCurrencies";

export const addCurrency = async (currency: string, userCurrencies?: string[] | null) => {
    const currencies = await getCurrencies(userCurrencies);
    
    if (!currencies.includes(currency)) {
        const newCurrencies = [...currencies, currency];
        await AsyncStorage.setItem("currencies", JSON.stringify(newCurrencies));
    }
};

