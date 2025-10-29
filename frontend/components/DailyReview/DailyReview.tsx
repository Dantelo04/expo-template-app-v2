import { useTheme } from "@/context/ThemeContext";
import { dailyReviewStyles } from "./DailyReview.style";
import { View } from "react-native";
import { Text } from "@/components/Text/Text";
import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { getAvgSpent } from "@/utils/filterRecords";
import { Record } from "@/lib/actions/createRecord";
import { formatNumberWithCommas } from "@/utils/numberFormat";
import { FontAwesome6 } from "@expo/vector-icons";
import { useSession } from "@/context/SessionProvider";
import { useTranslation } from "react-i18next";

interface DailyReviewProps {
  isReportsLoading: boolean;
  animationDelay?: number;
  data: { records: Record[]; previousRecords: Record[] };
}

export const DailyReview = ({
  isReportsLoading,
  animationDelay = 200,
  data,
}: DailyReviewProps) => {
  const { theme } = useTheme();
  const styles = dailyReviewStyles(theme);
  const avgSpent = getAvgSpent(data.records);
  const avgSpentPrevious = getAvgSpent(data.previousRecords);
  const higher = avgSpent > avgSpentPrevious;
  const { user } = useSession();
  const { t } = useTranslation();

  //Animations
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  useEffect(() => {
    if (isReportsLoading) {
      translateY.value = withTiming(-6);
      opacity.value = withTiming(0);
    } else {
      translateY.value = withDelay(animationDelay, withSpring(0));
      opacity.value = withDelay(animationDelay, withSpring(1));
    }
  }, [isReportsLoading]);

  const displayAnimation = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, displayAnimation]}>
      <View style={styles.content}>
        <Text variant="body12_bold" style={styles.subtitle}>
          {t("reports.avgSpentDaily")}
        </Text>
        <View style={styles.footer}>
          <Text
            variant="h3_extraBold"
            style={{
              color: higher
                ? theme.colors.semantic.warning
                : theme.colors.semantic.success,
            }}
          >
            {formatNumberWithCommas(avgSpent.toFixed(2).toString()) +
              " " +
              user?.mainCurrency?.toUpperCase()}
          </Text>
          <FontAwesome6
            name={higher ? "arrow-up" : "arrow-down"}
            size={24}
            color={
              higher
                ? theme.colors.semantic.warning
                : theme.colors.semantic.success
            }
          />
        </View>
      </View>
    </Animated.View>
  );
};
