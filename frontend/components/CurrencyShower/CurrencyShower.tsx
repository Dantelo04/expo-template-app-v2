import { View } from "react-native";
import { currencyShowerStyles } from "./CurrencyShower.style";
import { useTheme } from "@/context/ThemeContext";
import { Tag } from "../Tag/Tag";
import { router } from "expo-router";

interface CurrencyShowerProps {
  onCurrencyPress: (currency: string) => void;
  currencies: string[];
  currency: string;
}

export const CurrencyShower = ({ onCurrencyPress, currencies, currency }: CurrencyShowerProps) => {
  const { theme } = useTheme();
  const styles = currencyShowerStyles(theme);

  return (
    <View style={styles.container}>
      {currencies.map((item) => (
        <Tag
          key={item}
          active={currency === item}
          text={`${item.toUpperCase()}`}
          onPress={() => onCurrencyPress(item)}
        />
      ))}
      <Tag
        icon="plus"
        onPress={() => {
          router.push("/currency");
        }}
      />
    </View>
  );
};
