import { View } from "react-native";
import { Text } from "@/components/Text/Text";
import { useTheme } from "@/context/ThemeContext";
import { reportsReviewStyles } from "./ReportsReview.style";
import { Record } from "@/lib/actions/createRecord";
import { getTotalSpent } from "@/utils/filterRecords";
import { formatNumberWithCommas } from "@/utils/numberFormat";
import { FontAwesome6 } from "@expo/vector-icons";
import { useSession } from "@/context/SessionProvider";
import { FilterType, useFilter } from "@/context/FilterContext";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";

interface ReportsReviewProps {
  data: { records: Record[]; previousRecords: Record[] };
  filter: FilterType;
  isReportsLoading: boolean;
  animationDelay?: number;
  averageSpent?: number;
}

export const ReportsReview = ({ data, filter, isReportsLoading, animationDelay = 150, averageSpent }: ReportsReviewProps) => {
  const { theme } = useTheme();
  const styles = reportsReviewStyles(theme);
  const { t } = useTranslation();
  const { isLoading } = useFilter();
  const { totalSpent, previousTotalSpent, avgSpent } = getTotalSpent(
    data.records,
    data.previousRecords
  );
  const { user } = useSession();
  const higher = totalSpent > previousTotalSpent;
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  //Animations
  useEffect(() => {
    if (isLoading || isReportsLoading) {
      translateY.value = withTiming(-8);
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
      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="body12_bold" style={styles.subtitle}>
            {t("reports.totalSpent")}
          </Text>
          <View style={styles.titleContainer}>
            <Text
              variant="h3_extraBold"
              style={{ color: higher ? theme.colors.semantic.warning : theme.colors.semantic.success }}
            >
              {formatNumberWithCommas(totalSpent.toFixed(2).toString()) + " " + user?.mainCurrency?.toUpperCase()}
            </Text>
            <FontAwesome6
              name={higher ? "arrow-up" : "arrow-down"}
              size={24}
              color={higher ? theme.colors.semantic.warning : theme.colors.semantic.success}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Text variant="body12_bold" style={styles.subtitle}>
             {filter === "monthly" ? t("reports.lastMonth") : filter === "weekly" ? t("reports.lastWeek") : t("reports.lastYear")}
            </Text>
            <Text
              variant="body16_bold"
              style={{ color: !higher ? theme.colors.semantic.warning : theme.colors.semantic.success }}
            >
              {formatNumberWithCommas(previousTotalSpent.toFixed(2).toString())}
            </Text>
          </View>
          <View style={styles.footerItem}>
            <Text variant="body12_bold" style={styles.subtitle}>
              {t("reports.avg")}
            </Text>
            <Text
              variant="body16_bold"
              style={{ color: higher ? theme.colors.semantic.warning : theme.colors.semantic.success }}
            >
              {formatNumberWithCommas(averageSpent ? averageSpent.toFixed(2).toString() : totalSpent.toFixed(2).toString())}
            </Text>
          </View>
          <View style={styles.footerItem}>
            <Text variant="body12_bold" style={styles.subtitle}>
              {t("reports.records")}
            </Text>
            <Text
              variant="body16_bold"
              style={{ color: theme.colors.text.secondary }}
            >
              {data.records.length + data.previousRecords.length}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};
