import { View } from "react-native";
import { walletShowerStyles } from "./WalletShower.style";
import { useTheme } from "@/context/ThemeContext";
import { Tag } from "../Tag/Tag";
import { router } from "expo-router";
import i18n from "@/lib/i18n";

interface WalletShowerProps {
  onWalletPress: (wallet: string) => void;
  wallets: string[];
  wallet: string;
}

export const WalletShower = ({
  onWalletPress,
  wallets,
  wallet,
}: WalletShowerProps) => {
  const { theme } = useTheme();
  const styles = walletShowerStyles(theme);

  return (
    <View style={styles.container}>
      {wallets.map((item) => (
        <Tag
          key={item}
          text={item === "building-columns.bank" && i18n.language === "es" ? "Banco" : item.split(".")[1]}
          active={wallet === item}
          onPress={() => onWalletPress(item)}
          capitalize
        />
      ))}
      <Tag
        icon="plus"
        text="Add Wallet"
        onPress={() => router.push("/wallets")}
      />
    </View>
  );
};
