
import { onboardingStyles } from "./Onboarding.style";
import { useTheme } from "@/context/ThemeContext";
import { useSession } from "@/context/SessionProvider";
import { Redirect } from "expo-router";
import { CurrencySelector } from "../CurrencySelector/CurrencySelector";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

export function Onboarding() {
  const { theme } = useTheme();
  const styles = onboardingStyles(theme);
  const { hasMainCurrency } = useSession();
  const { t } = useTranslation();
  
  if (hasMainCurrency) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <CurrencySelector onlyOne={true} title={t('onboarding.title')} />
    </SafeAreaView>
  );
}
