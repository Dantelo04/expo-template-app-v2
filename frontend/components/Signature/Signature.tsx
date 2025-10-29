import { View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { signatureStyles } from "./Signature.style";
import { Text } from "../Text/Text";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";

interface SignatureProps {
  marginTop?: number;
}

export const Signature = ({ marginTop }: SignatureProps) => {
  const { theme } = useTheme();
  const styles = signatureStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { marginTop }]}>
      <Text
        variant="body16_medium"
        style={{ color: theme.colors.text.secondary, textAlign: "center" }}
      >
        {t('signature.madeBy')}
      </Text>
      <Link href="https://dantelo.dev/" style={{ justifyContent: "center", alignItems: "center" }}>
        <Text variant="body16_medium" style={{ color: theme.colors.text.primary, textAlign: "center" }}>{t('signature.dante')}</Text>
      </Link>
    </View>
  );
};
