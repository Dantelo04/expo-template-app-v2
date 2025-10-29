import { CurrencySelector } from "@/screens/CurrencySelector/CurrencySelector";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function CurrencyChangeScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background.primary }}
      edges={["bottom"]}
    >
      <CurrencySelector onlyOne title={t('currencyChange.title')} />
    </SafeAreaView>
  );
}
