import { View } from "react-native";
import { lockScreenStyles } from "./LockScreen.style";
import { useTheme } from "@/context/ThemeContext";
import { Text } from "@/components/Text/Text";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@/components/Button/Button";
import { useEffect, useState } from "react";
import { usePermission } from "@/context/PermissionContext";
import Purchases, { PurchasesOfferings } from "react-native-purchases";
import { router } from "expo-router";
import { Feature } from "./Feature";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useTranslation } from "react-i18next";

export const LockScreen = () => {
  const { theme } = useTheme();
  const styles = lockScreenStyles(theme);
  const { grantAccess } = usePermission();
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    const offering = offerings?.current?.availablePackages[0];
    setLoading(true);
    if (offering) {
      try {
        const { customerInfo } = await Purchases.purchasePackage(offering);
        if (
          typeof customerInfo.entitlements.active["Nekonomy Pro"] !==
          "undefined"
        ) {
          console.log(
            "Subscription successful",
            JSON.stringify(customerInfo, null, 2)
          );
          grantAccess();
          router.navigate("/");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  async function getOfferings() {
    const offerings = await Purchases.getOfferings();
    setOfferings(offerings);
  }

  useEffect(() => {
    getOfferings();
  }, []);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    opacity.value = withSpring(1, { duration: 1000 });
    translateY.value = withSpring(0, { duration: 500 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <LinearGradient
      colors={["rgba(219, 199, 168, 1)", "rgba(254, 250, 224, 0.9)"]}
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View style={[styles.titleContainer, animatedStyle]}>
          <Text variant="h1_extraBold" style={styles.title} numberOfLines={1}>
            Nekonomy
          </Text>
          <Text
            variant="bigTitle"
            style={[styles.title, { marginTop: -16 }]}
          >
            Pro
          </Text>
        </Animated.View>
        <Animated.View style={[styles.featureContainer, animatedStyle]}>
          <Feature title={t("lockScreen.features.fullAccess")} icon="chart-line" />
          <Feature title={t("lockScreen.features.unlimitedCategories")} icon="chart-pie" />
          <Feature title={t("lockScreen.features.unlimitedCurrencies")} icon="globe" />
          <Feature title={t("lockScreen.features.manageCurrencies")} icon="coins" />
        </Animated.View>
        <Button style={styles.button} onPress={handleSubscribe} disabled={loading}>
          {loading ? t("common.processing") : t("lockScreen.button", { price: offerings?.current?.availablePackages[0].product.priceString })}
          {!loading && offerings?.current?.availablePackages[0].product.priceString}
        </Button>
        <Text variant="body14_medium" style={styles.price}>{t("lockScreen.price")}</Text>
      </View>
    </LinearGradient>
  );
};
