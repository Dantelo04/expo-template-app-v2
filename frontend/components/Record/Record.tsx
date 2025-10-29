import { Dimensions, View } from "react-native";
import { recordStyles } from "./Record.style";
import { useTheme } from "@/context/ThemeContext";
import { Record as RecordType } from "@/lib/actions/createRecord";
import { Text } from "../Text/Text";
import {
  Gesture,
  GestureDetector,
  Pressable,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  Easing,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import { FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { getConversions } from "@/lib/actions/getConversions";
import { CategoryIcon } from "../CategoryIcon/CategoryIcon";
import i18n from "@/lib/i18n";
import TextTicker from "react-native-text-ticker";
import { LinearGradient } from "expo-linear-gradient";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { Button } from "../Button/Button";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { amountShort } from "@/utils/amountShort";

interface RecordProps {
  record: RecordType;
  onDelete?: (id: string) => void;
  mainCurrency?: string;
  disabled?: boolean;
  type?: "programmed" | "recurrent" | "default";
}

export const Record = ({
  record,
  onDelete,
  mainCurrency,
  disabled = false,
  type = "default",
}: RecordProps) => {
  const { theme } = useTheme();
  const styles = recordStyles(theme);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const height = useSharedValue(59);
  const marginBottom = useSharedValue(4);
  const { width } = Dimensions.get("window");
  const swipe_threshold = width * 0.2;
  const [convertedAmount, setConvertedAmount] = useState(0);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchConversions = async () => {
      try {
        const conversions = await getConversions(mainCurrency || "");
        setConvertedAmount(record.amount / conversions[record.currency]);
      } catch (error) {
        console.error("Error fetching conversions:", error);
        setConvertedAmount(record.amount);
      }
    };
    fetchConversions();
  }, [record.amount, mainCurrency, record.currency]);

  const swipeGesture = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .failOffsetY([-5, 5])
    .minDistance(10)
    .maxPointers(1)
    .onStart(() => {})
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value < -swipe_threshold) {
        translateX.value = withTiming(-width, {
          duration: 250,
          easing: Easing.out(Easing.cubic),
        });
        height.value = withTiming(0);
        marginBottom.value = withTiming(0);
        opacity.value = withTiming(
          0,
          {
            duration: 150,
            easing: Easing.out(Easing.cubic),
          },
          (isFinished) => {
            if (isFinished && onDelete && !disabled) {
              runOnJS(onDelete)(record.id);
            }
          }
        );
      } else if (translateX.value > swipe_threshold) {
        translateX.value = withSpring(0, { damping: 10, stiffness: 100 });
        runOnJS(router.push)(
          `/edit${record.type === "income" ? "Income" : "Expense"}?recordId=${
            record.id
          }`
        );
      } else {
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 200,
          mass: 1.2,
        });
        opacity.value = withSpring(1);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    height: height.value,
    marginBottom: marginBottom.value,
    opacity: opacity.value,
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, swipe_threshold], [0, 1]),
    width: interpolate(translateX.value, [swipe_threshold, 15], [110, 40]),
  }));

  const animatedIconStyleRight = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -swipe_threshold], [0, 1]),
    width: interpolate(translateX.value, [-15, -swipe_threshold], [40, 110]),
  }));

  const paddingCorrection = 4;
  const recordTitleLength =
    type === "programmed" || type === "recurrent"
      ? record.title.split(".")[1].length
      : record.title.length;

  const onActionSheetPress = () => {
    actionSheetRef.current?.show();
  };

  const onDeletePress = () => {
    actionSheetRef.current?.hide();
    if (onDelete) {
      setTimeout(() => {
        onDelete(record.id);
      }, 250);
    }
  };

  const onEditPress = () => {
    actionSheetRef.current?.hide();
    router.push(
      `/edit${record.type === "income" ? "Income" : "Expense"}?recordId=${
        record.id
      }`
    );
  };

  return (
    <>
      <Animated.View
        style={[
          styles.relativeContainer,
          animatedContainerStyle,
          { opacity: disabled ? 0.6 : 1 },
        ]}
      >
        <GestureDetector
          gesture={disabled ? Gesture.Exclusive() : swipeGesture}
        >
          <Pressable
            onPress={onActionSheetPress}
            style={({ pressed }) => ({ opacity: pressed ? 0.95 : 1 })}
          >
            <Animated.View style={[styles.container, animatedStyle]}>
              <View style={[styles.header]}>
                {record.category && (
                  <CategoryIcon
                    icon={record.category?.split(".")[0] || "other"}
                    onPress={() => {}}
                    pressable={false}
                  />
                )}
                <View
                  style={[
                    styles.titleContainer,
                    {
                      marginLeft:
                        recordTitleLength > 14 ? -paddingCorrection : 0,
                    },
                  ]}
                >
                  <TextTicker
                    style={[
                      styles.title,
                      {
                        paddingLeft:
                          recordTitleLength > 14 ? paddingCorrection : 0,
                      },
                    ]}
                    numberOfLines={1}
                    shouldAnimateTreshold={0}
                    scroll={false}
                    bounce={false}
                    animationType="scroll"
                    scrollSpeed={50}
                    marqueeDelay={2200}
                    easing={Easing.linear}
                    ellipsizeMode="clip"
                  >
                    {type === "programmed" || type === "recurrent"
                      ? record.title.split(".")[1]
                      : record.title.split(".").length > 1
                      ? record.title.split(".")[1]
                      : record.title}
                  </TextTicker>
                  {recordTitleLength > 14 && (
                    <LinearGradient
                      colors={[
                        "rgba(246, 242, 215, 1)",
                        "rgba(246, 242, 215, 0)",
                        "rgba(246, 242, 215, 0)",
                        "rgba(246, 242, 215, 1)",
                      ]}
                      start={{ x: 0, y: 0 }}
                      locations={[0, 0.04, 0.91, 1]}
                      end={{ x: 1, y: 0 }}
                      style={styles.titleMask}
                    />
                  )}
                  <Text
                    variant="body14_medium"
                    numberOfLines={1}
                    style={[
                      styles.date,
                      {
                        marginLeft:
                          recordTitleLength > 14 ? paddingCorrection : 0,
                      },
                    ]}
                  >
                    {type === "default"
                      ? new Date(record.date).toLocaleDateString(
                          i18n.language === "es" ? "es-ES" : "en-US",
                          currentYear === new Date(record.date).getFullYear() ? {
                            month: "long",
                            day: "numeric",
                          } : {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : type === "programmed" && i18n.language === "es"
                      ? `Actualizar El ${new Date(record.date).getDate()}`
                      : type === "programmed" && i18n.language === "en"
                      ? `Update The ${new Date(record.date).getDate()}th`
                      : type === "recurrent" && i18n.language === "es"
                      ? `Actualizar Cada ${new Date(record.date).getDate()}`
                      : `Update Every ${new Date(record.date).getDate()}th`}
                  </Text>
                </View>
              </View>
              <View style={styles.amountsContainer}>
                <View style={styles.amountContainer}>
                  <Text
                    variant="body14_medium"
                    style={
                      record.type === "income"
                        ? styles.amountIncome
                        : styles.amountExpense
                    }
                  >
                    {record.amount &&
                      (record.type === "income" ? "+" : "-") +
                        amountShort(record.amount)}
                  </Text>
                  <Text
                    variant="body14_medium"
                    style={
                      record.type === "income"
                        ? styles.amountIncome
                        : styles.amountExpense
                    }
                  >
                    {record.currency.toUpperCase()}
                  </Text>
                </View>
                {mainCurrency !== record.currency && (
                  <View style={styles.amountContainer}>
                    <Text
                      variant="body12_medium"
                      style={
                        record.type === "income"
                          ? styles.convertedAmountIncome
                          : styles.convertedAmountExpense
                      }
                    >
                      {convertedAmount &&
                        `${record.type === "income" ? "+" : "-"}${amountShort(
                          convertedAmount
                        )}`}
                    </Text>
                    <Text
                      variant="body12_medium"
                      style={
                        record.type === "income"
                          ? styles.convertedAmountIncome
                          : styles.convertedAmountExpense
                      }
                    >
                      {mainCurrency?.toUpperCase()}
                    </Text>
                  </View>
                )}
              </View>
            </Animated.View>
          </Pressable>
        </GestureDetector>
        <Animated.View style={[styles.iconWrapper, animatedIconStyleRight]}>
          <FontAwesome6
            name="trash"
            size={18}
            color={theme.colors.semantic.warning}
            style={{ marginRight: -8 }}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.iconWrapper,
            {
              right: "auto",
              left: 0,
              paddingLeft: 8,
              backgroundColor: theme.colors.text.currencyLight,
            },
            animatedIconStyle,
          ]}
        >
          <FontAwesome6
            name="pencil"
            size={18}
            color={theme.colors.basic.white}
            style={{ marginLeft: -8 }}
          />
        </Animated.View>
      </Animated.View>
      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled={true}
        containerStyle={styles.actionSheet}
        indicatorStyle={styles.indicator}
        closeOnTouchBackdrop={true}
        defaultOverlayOpacity={0.3}
        statusBarTranslucent={false}
        drawUnderStatusBar={false}
        useBottomSafeAreaPadding={true}
      >
        <Text variant="body16_medium" style={styles.actionSheetTitle}>
          {record.title.includes("p.") || record.title.includes("r.")
            ? record.title.split(".")[1]
            : record.title}
        </Text>
        <Pressable
          onPress={onEditPress}
          style={({ hovered, pressed }) => [
            (hovered || pressed) && { opacity: 0.5 },
            styles.pressableHover,
          ]}
        >
          <Button
            variant="icon"
            activeOpacity={1}
            style={{
              backgroundColor: theme.colors.text.currency,
              marginBottom: 12,
            }}
            icon={
              <FontAwesome6
                name="pencil"
                size={24}
                color={theme.colors.basic.white}
              />
            }
          >
            {t("record.edit")}
          </Button>
        </Pressable>
        <Pressable
          onPress={onDeletePress}
          style={({ hovered, pressed }) => [
            (hovered || pressed) && { opacity: 0.5, zIndex: 100 },
            styles.pressableHover,
          ]}
        >
          <Button
            variant="icon"
            activeOpacity={1}
            style={{
              backgroundColor: theme.colors.semantic.warningDark,
              marginBottom: 12,
            }}
            icon={
              <FontAwesome6
                name="trash"
                size={24}
                color={theme.colors.basic.white}
              />
            }
          >
            {t("record.delete")}
          </Button>
        </Pressable>
      </ActionSheet>
    </>
  );
};
