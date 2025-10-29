import { ColorValue, View } from "react-native";
import { exchangeRatesStyles } from "./ExchangeRates.style";
import { useTheme } from "@/context/ThemeContext";
import { Text } from "@/components/Text/Text";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6 } from "@expo/vector-icons";
import { useSession } from "@/context/SessionProvider";
import { useCallback, useEffect, useState } from "react";
import {
  getConversionsByDate,
  getConversions,
} from "@/lib/actions/getConversions";
import { calculateMostUsedCurrencies } from "@/utils/calculateMostUsedCurrencies";
import { useRecords } from "@/context/RecordsContext";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { withSpring } from "react-native-reanimated";
import { amountShortGeneral } from "@/utils/amountShort";

export const ExchangeRates = () => {
  const { theme } = useTheme();
  const styles = exchangeRatesStyles(theme);
  const { user } = useSession();
  const { records, isLoading } = useRecords();
  const [conversionsToday, setConversionsToday] = useState<
    Record<string, number>
  >({});
  const [positive, setPositive] = useState({
    first: true,
    second: true,
    third: true,
  });
  const [mostUsedCurrencies, setMostUsedCurrencies] = useState<string[]>([]);
  const [conversions, setConversions] = useState<Record<string, number>>({
    first: 1,
    second: 1,
    third: 1,
  });
  const { t } = useTranslation();

  const fetchAllData = useCallback(async () => {
    if (!user?.mainCurrency || !records) return;

    const currencies = await calculateMostUsedCurrencies(
      3,
      records,
      user.mainCurrency
    );
    setMostUsedCurrencies(currencies);

    const conversions = await getConversions(user.mainCurrency);
    setConversionsToday(conversions);

    const yesterday = new Date(new Date().setDate(new Date().getDate() - 3))
      .toISOString()
      .split("T")[0];
    const conversionsYesterday = await getConversionsByDate(
      user.mainCurrency,
      yesterday
    );

    const newConversions = {
      first: conversions[currencies[0] || "usd"]
        ? 1 / conversions[currencies[0] || "usd"]
        : 1,
      second: conversions[currencies[1] || "eur"]
        ? 1 / conversions[currencies[1] || "eur"]
        : 1,
      third: conversions[currencies[2] || "gbp"]
        ? 1 / conversions[currencies[2] || "gbp"]
        : 1,
    };
    setConversions(newConversions);

    setPositive({
      first:
        (conversions[currencies[0] || "usd"] || 0) >
        (conversionsYesterday[currencies[0] || "usd"] || 0),
      second:
        (conversions[currencies[1] || "eur"] || 0) >
        (conversionsYesterday[currencies[1] || "eur"] || 0),
      third:
        (conversions[currencies[2] || "gbp"] || 0) >
        (conversionsYesterday[currencies[2] || "gbp"] || 0),
    });
  }, [user?.mainCurrency, records]);

  useFocusEffect(
    useCallback(() => {
      fetchAllData();
    }, [fetchAllData])
  );

  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  //Animations
  useEffect(() => {
    if (isLoading) {
      translateY.value = withSpring(6);
      opacity.value = withSpring(0);  
    } else {
      translateY.value = withSpring(0);
      opacity.value = withSpring(1);  
    }
  }, [isLoading]);

  const displayAnimation = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const positiveGradient = ["#F1F1D4", "#A1C994"];
  const negativeGradient = ["#F7EED6", "#BF8D7F"];

  if (isLoading)
    return (
      <View style={styles.container}>
        <Text variant="body20_bold">{t("exchangeRates.title")}</Text>
        <View style={[styles.exchangeContainer, { height: 80 }]}></View>
      </View>
    );

  return (
    <Animated.View style={[styles.container, displayAnimation]}>
      <Text variant="body20_bold">{t("exchangeRates.title")}</Text>
      <LinearGradient
        colors={
          positive.first
            ? (positiveGradient as [ColorValue, ColorValue])
            : (negativeGradient as [ColorValue, ColorValue])
        }
        start={{ x: 0.8, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.exchangeContainer}
      >
        <Text
          variant="body14_bold"
          numberOfLines={1}
          style={[
            styles.exchangeRate,
            {
              color: positive.first
                ? theme.colors.semantic.success
                : theme.colors.semantic.warningDarker,
            },
          ]}
        >
          {mostUsedCurrencies[0] || "USD"}
        </Text>
        <View style={styles.exchangeContent}>
          <View style={styles.titleContainer}>
            <Text
              variant="h2_extraBold"
              numberOfLines={1}
              style={[
                styles.exchangeRate,
                {
                  color: positive.first
                    ? theme.colors.semantic.success
                    : theme.colors.semantic.warningDarker,
                },
              ]}
            >
              {`${
                user?.mainCurrency !== "pyg"
                  ? amountShortGeneral(conversions.first)
                  : amountShortGeneral(parseInt(conversions.first.toString()))
              } ${user?.mainCurrency || "USD"}`}
            </Text>
            <FontAwesome6
              name={positive.first ? "arrow-up" : "arrow-down"}
              size={22}
              color={
                positive.first
                  ? theme.colors.semantic.success
                  : theme.colors.semantic.warningDarker
              }
            />
          </View>
          <View style={styles.currencyContainer}>
            <View style={styles.amountContainer}>
              <Text
                variant="body14_medium"
                numberOfLines={1}
                style={[
                  styles.currencyText,
                  {
                    color: positive.second
                      ? theme.colors.semantic.success
                      : theme.colors.semantic.warningDarker,
                  },
                ]}
              >
                {`${mostUsedCurrencies[1] || "EUR"} ${
                  user?.mainCurrency !== "pyg"
                    ? conversions.second.toFixed(2)
                    : conversions.second.toFixed(0)
                }`}
              </Text>
              <FontAwesome6
                name={positive.second ? "arrow-up" : "arrow-down"}
                size={12}
                color={
                  positive.second
                    ? theme.colors.semantic.success
                    : theme.colors.semantic.warningDarker
                }
              />
            </View>
            <View style={styles.amountContainer}>
              <Text
                variant="body14_medium"
                numberOfLines={1}
                style={[
                  styles.currencyText,
                  {
                    color: positive.third
                      ? theme.colors.semantic.success
                      : theme.colors.semantic.warningDarker,
                  },
                ]}
              >
                {`${mostUsedCurrencies[2] || "GBP"} ${
                  user?.mainCurrency !== "pyg"
                    ? conversions.third.toFixed(2)
                    : conversions.third.toFixed(0)
                }`}
              </Text>
              <FontAwesome6
                name={positive.third ? "arrow-up" : "arrow-down"}
                size={12}
                color={
                  positive.third
                    ? theme.colors.semantic.success
                    : theme.colors.semantic.warningDarker
                }
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
