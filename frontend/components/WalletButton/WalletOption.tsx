import { Text } from "../Text/Text";
import { useTheme } from "@/context/ThemeContext";
import { Pressable, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { walletButtonStyles } from "./WalletButton.style";
import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";

interface WalletOptionProps {
  wallet: string | null;
  isSelected: boolean;
  onPress: () => void;
}

export const WalletOption = ({
  wallet,
  isSelected,
  onPress,
}: WalletOptionProps) => {
  const { theme } = useTheme();
  const styles = walletButtonStyles(theme);
  const { t } = useTranslation();
  
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: theme.colors.background.secondary,
        borderless: false,
      }}
      style={({ hovered, pressed }) => [
        styles.button,
        (hovered || pressed) && { opacity: 0.5 },
      ]}
    >
      <View style={styles.optionContent}>
        {wallet && <FontAwesome6
          name={wallet?.split(".")[0]}
          solid
          size={20}
          color={
            isSelected
              ? theme.colors.text.primary
              : theme.colors.text.secondary
          }
          style={styles.icon}
        />}
        <Text
          variant="body20_medium"
          style={{
            color: isSelected
              ? theme.colors.text.primary
              : theme.colors.text.secondary,
            textTransform: wallet ? "capitalize" : "none",
          }}
        >
          {wallet === "building-columns.bank" && i18n.language === "es" ? "Banco" : wallet?.split(".")[1] || t("wallets.allWallets")}
        </Text>
      </View>
    </Pressable>
  );
};

