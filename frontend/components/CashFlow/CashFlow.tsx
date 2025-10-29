import { View } from "react-native";
import { Text } from "@/components/Text/Text";
import { cashFlowStyles } from "./CashFlow.style";
import { useTheme } from "@/context/ThemeContext";
import { Record } from "@/lib/actions/createRecord";
import { getCashFlow, getPreviousExpense } from "@/utils/filterRecords";
import { useEffect, useState } from "react";
import { InExChart } from "../LineChart/InExChart";
import { FilterType, useFilter } from "@/context/FilterContext";
import { ExExChart } from "../LineChart/ExExChart";
import { useTranslation } from "react-i18next";
import Animated, { useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import { useAnimatedStyle } from "react-native-reanimated";

interface CashFlowProps {
  records: Record[];
  previousRecords?: Record[];
  filter: FilterType;
  type?: "income_expense" | "expense_expense";
  animationDelay?: number;
  isReportsLoading?: boolean;
}

export const CashFlow = ({ records, filter, type = "income_expense", previousRecords, animationDelay = 350, isReportsLoading = false }: CashFlowProps) => {
  const { theme } = useTheme();
  const styles = cashFlowStyles(theme);
  const { isLoading } = useFilter();
  const { t } = useTranslation();
  const [dataIncome, setDataIncome] = useState<any[]>([
    type === "income_expense" ? { totalIncome: 0, totalExpense: 0, day: 0 } : { previousExpense: 0, expense: 0, day: 0 },
  ]);

  const transformData = async () => {
    const data = await getCashFlow(records, filter);
    if (previousRecords) {
      const previousData = await getPreviousExpense(records, previousRecords, filter);
      setDataIncome(previousData);
    } else {
      setDataIncome(data);
    }
  };

  useEffect(() => {
    if (records.length > 0) {
      transformData();
    } else {
      setDataIncome(type === "income_expense" ? [{ totalIncome: 0, totalExpense: 0, day: 0 }] : [{ previousExpense: 0, expense: 0, day: 0 }]);
    }
  }, [records]);

  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  //Animations
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
      {dataIncome.length > 1 ? (
        <View style={styles.graphContainer}>
          {type === "income_expense" ? <InExChart data={dataIncome} /> : <ExExChart data={dataIncome} />}
          <View style={styles.footer}>
            <View style={styles.footerText}>
              <View
                style={[
                  styles.dataPoint,
                  { backgroundColor: type === "income_expense" ? theme.colors.semantic.success : theme.colors.semantic.warningDark },
                ]}
              />
              <Text variant="body14_medium">{type === "income_expense" ? t("reports.income") : t("reports.previousExpense")}</Text>
            </View>
            <View style={styles.footerText}>
              <View
                style={[
                  styles.dataPoint,
                  { backgroundColor: theme.colors.semantic.warning },
                ]}
              />
              <Text variant="body14_medium">{type === "income_expense" ? t("reports.expense") : t("reports.currentExpense")}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.graphContainer,
            {
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
              paddingBottom: 24,
            },
          ]}
        >
          <Text
            variant="body14_medium"
            style={[
              styles.footerText,
              { textAlign: "center", maxWidth: 150, opacity: 0.4 },
            ]}
          >
            {t("reports.notEnoughData")}
          </Text>
        </View>
      )}
    </Animated.View>
  );
};
