import { View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { evaluationStyles } from "./Evaluation.style";
import { Text } from "@/components/Text/Text";
import { useCallback, useEffect, useState } from "react";
import { calculateTotal } from "@/utils/calculateTotal";
import { useRecords } from "@/context/RecordsContext";
import { useFocusEffect } from "expo-router";
import { formatNumberWithCommas } from "@/utils/numberFormat";
import { useSession } from "@/context/SessionProvider";
import { useTranslation } from "react-i18next";
import { Record } from "@/lib/actions/createRecord";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import { useFilter } from "@/context/FilterContext";
import { amountShort } from "@/utils/amountShort";

interface EvaluationData {
  totalIncome: string;
  totalExpenses: string;
  totalBalance: string;
}

interface EvaluationProps {
  filteredRecords?: Record[];
  isReportsLoading?: boolean;
  animationDelay?: number;
}

export const Evaluation = ({ filteredRecords, isReportsLoading, animationDelay = 250 }: EvaluationProps) => {
  const { theme } = useTheme();
  const styles = evaluationStyles(theme);
  const { isLoading } = useFilter();
  const { user } = useSession();
  const { records } = useRecords();
  const [data, setData] = useState<EvaluationData>({
    totalIncome: "0",
    totalExpenses: "0",
    totalBalance: "0",
  });
  const { t } = useTranslation();

  const fetchData = async () => {
    const data = await calculateTotal(
      filteredRecords || records || [],
      user?.mainCurrency || "pyg",
      true,
    );
    setData({
      totalIncome: data.totalIncome.toFixed(2),
      totalExpenses: data.totalExpenses.toFixed(2),
      totalBalance: data.totalBalance.toFixed(2),
    });
  };

  useFocusEffect(
    useCallback(() => {
      if (records || filteredRecords) {
        fetchData();
      }
    }, [records, filteredRecords])
  );

  const textSize = "body14_medium";

  //Animations
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  useEffect(() => {
    if (isLoading || isReportsLoading) {
      translateY.value = withTiming(-6);
      opacity.value = withTiming(0);
    } else {
      translateY.value = withDelay(animationDelay, withSpring(0));
      opacity.value = withDelay(animationDelay, withSpring(1));
    }
  }, [isLoading, isReportsLoading]);

  const displayAnimation = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, displayAnimation]}>
      {!filteredRecords && (
        <Text variant="body20_bold">{t("evaluation.title")}</Text>
      )}
      <View
        style={[
          styles.evaluationContainer,
          { opacity: (records || filteredRecords)?.length === 0 ? 0.4 : 1 },
        ]}
      >
        <View style={styles.itemContainer}>
          <Text variant={textSize} style={styles.itemText}>
            {t("evaluation.totalIncome")}
          </Text>
          <Text variant={textSize} style={styles.incomeText}>
            +{amountShort(Number(data.totalIncome))} {user?.mainCurrency?.toUpperCase()}
          </Text>
        </View>
        <View style={styles.itemContainer}>
          <Text variant={textSize} style={styles.itemText}>
            {t("evaluation.totalExpenses")}
          </Text>
          <Text variant={textSize} style={styles.expenseText}>
            -{amountShort(Number(data.totalExpenses))} {user?.mainCurrency?.toUpperCase()}
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.itemContainer}>
          <Text variant={textSize} style={styles.itemText}>
            {t("evaluation.totalBalance")}
          </Text>
          <Text
            variant={textSize}
            style={
              data.totalBalance[0] === "-"
                ? styles.expenseText
                : styles.incomeText
            }
          >
            {data.totalBalance[0] === "-" ? "" : "+"}
            {amountShort(Number(data.totalBalance))} {user?.mainCurrency?.toUpperCase()}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};
