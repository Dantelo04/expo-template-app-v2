import { View } from "react-native";
import { Text } from "@/components/Text/Text";
import { useTheme } from "@/context/ThemeContext";
import { incomeByWalletStyles } from "./IncomeByWallet.style";
import { PieChart } from "react-native-gifted-charts";
import { useCallback, useEffect, useState } from "react";
import {
  calculateBalanceByWallet,
  IncomeByWalletData,
} from "@/utils/calculateIncomeByWallet";
import { useSession } from "@/context/SessionProvider";
import { useFocusEffect } from "@react-navigation/native";
import { useRecords } from "@/context/RecordsContext";
import { FontAwesome6 } from "@expo/vector-icons";
import { DEFAULT_PIE_CHART_DATA } from "@/assets/data/constants";
import { useTranslation } from "react-i18next";
import { Record } from "@/lib/actions/createRecord";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import { useFilter } from "@/context/FilterContext";

interface IncomeByWalletProps {
  convertedRecords?: Record[];
  showTitle?: boolean;
  animationDelay?: number;
  isReportsLoading?: boolean;
}

export const IncomeByWallet = ({ convertedRecords, showTitle = true, animationDelay = 450, isReportsLoading = false }: IncomeByWalletProps) => {
  const { theme } = useTheme();
  const styles = incomeByWalletStyles(theme);
  const [data, setData] = useState<IncomeByWalletData[]>([]);
  const { user } = useSession();
  const { records } = useRecords();
  const { t } = useTranslation();
  const { isLoading } = useFilter();

  const fetchData = async () => {
    const data = await calculateBalanceByWallet(
      user?.mainCurrency || "usd",
      convertedRecords || records || []
    );
    setData(data as IncomeByWalletData[]);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [records, convertedRecords])
  );

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
      {showTitle && <Text variant="body20_bold">{t('incomeByWallet.title')}</Text>}
      <View style={styles.chartContainer}>
        <View style={styles.contentContainer}>
          {data.length > 0 ? data.map((item, index) => (
            <View style={styles.itemContainer} key={index}>
              <View style={styles.itemContent}>
                <FontAwesome6
                  name={item.text?.split(".")[0] || "circle"}
                  size={20}
                  color={item.color}
                />
                <Text variant="body14_medium" style={styles.itemText} numberOfLines={1}>
                  {item.text?.split(".")[1] || item.text}
                </Text>
              </View>

              <Text variant="body14_bold" style={styles.itemText}>
                {item.percentage.toFixed(0)}%
              </Text>
            </View>
          )) : (
            <View style={[styles.itemContainer, { opacity: 0.3, justifyContent: "center", alignItems: "center" }]}>
              <Text variant="body14_medium" style={{ textAlign: "center", color: theme.colors.text.primary, maxWidth: 140 }}>{t('incomeByWallet.noIncome')}</Text>
            </View>
          )}
        </View>
        <View style={styles.separator} />
        <View style={[styles.pieChartContainer, { opacity: data.length > 0 ? 1 : 0.4 }]}>
          <PieChart
            donut
            data={data.length > 0 ? data : DEFAULT_PIE_CHART_DATA}
            showText={false}
            radius={72}
            innerRadius={0}
            innerCircleColor={theme.colors.background.secondary}
            isAnimated
          />
        </View>
      </View>
    </Animated.View>
  );
};

