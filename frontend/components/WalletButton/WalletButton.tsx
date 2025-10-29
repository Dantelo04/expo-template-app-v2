import { FontAwesome6 } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useWallet } from "@/context/WalletContext";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { useRef } from "react";
import React from "react";
import { useSession } from "@/context/SessionProvider";
import { WalletOption } from "./WalletOption";
import { walletButtonStyles } from "./WalletButton.style";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export const WalletButton = () => {
  const { theme } = useTheme();
  const styles = walletButtonStyles(theme);
  const { selectedWallet, setSelectedWallet } = useWallet();
  const { user } = useSession();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { t } = useTranslation();
  const wallets = user?.wallets || [];

  const onPress = () => {
    actionSheetRef.current?.show();
  };

  const onWalletPress = (wallet: string | null) => {
    setSelectedWallet(wallet);
    actionSheetRef.current?.hide();
  };

  const onAddWalletPress = () => {
    router.push("/wallets");
    actionSheetRef.current?.hide();
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        pressRetentionOffset={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <FontAwesome6
          name="chevron-down"
          solid
          size={14}
          color={theme.colors.text.secondary}
        />
        <FontAwesome6
          name={selectedWallet?.split(".")[0] || "money-check-dollar"}
          solid
          size={26}
          color={theme.colors.text.secondary}
        />
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled={true}
        containerStyle={styles.actionSheet}
        indicatorStyle={styles.indicator}
        closeOnTouchBackdrop={true}
        defaultOverlayOpacity={0.3}
      >
        {wallets.length > 0 && (
          <>
            <WalletOption
              wallet={null}
              isSelected={selectedWallet === null}
              onPress={() => onWalletPress(null)}
            />
            <View style={styles.separator} />
          </>
        )}
        {wallets.map((wallet, index) => (
          <React.Fragment key={wallet}>
            <WalletOption
              wallet={wallet}
              isSelected={selectedWallet === wallet}
              onPress={() => onWalletPress(wallet)}
            />
            {index !== wallets.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        ))}
        {wallets.length > 0 && <View style={styles.separator} />}
        <WalletOption
          wallet={`plus.${t("wallets.addWallet")}`}
          isSelected={false}
          onPress={onAddWalletPress}
        />
      </ActionSheet>
    </>
  );
};
