import { TouchableOpacity, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { infoModalStyles } from "./InfoModal.style";
import { FontAwesome6 } from "@expo/vector-icons";
import { Text } from "../Text/Text";
import { useTranslation } from "react-i18next";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

interface InfoModalProps {
  onPress: () => void;
}

export const InfoModal = ({ onPress }: InfoModalProps) => {
  const { theme } = useTheme();
  const styles = infoModalStyles(theme);
  const { t } = useTranslation();

  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSpring(0, {
      damping: 10,
      stiffness: 100,
    });
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <TouchableOpacity
      style={styles.absoluteContainer}
      onPress={onPress}
      activeOpacity={1}
    >
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <Animated.View style={[styles.content, animatedStyle]}>
          <Text variant="body16_medium" style={styles.title}>
            {t("infoModal.programmedRecords")}
          </Text>
          <View style={styles.separator} />
          <Text variant="body14_medium" style={styles.description}>
            {t("infoModal.programmedDescription")}
          </Text>
          <Text variant="body16_medium" style={[styles.title, { paddingTop: 16 }]}>
            {t("infoModal.recurrentRecords")}
          </Text>
          <View style={styles.separator} />
          <Text variant="body14_medium" style={styles.description}>
            {t("infoModal.recurrentDescription")}
          </Text>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

interface InfoButtonProps {
  onPress: () => void;
}

export const InfoButton = ({ onPress }: InfoButtonProps) => {
  const { theme } = useTheme();
  const styles = infoModalStyles(theme);
  const { t } = useTranslation();

  return (
    <TouchableOpacity hitSlop={20} onPress={onPress}>
      <FontAwesome6
        name="circle-info"
        size={16}
        color={theme.colors.text.secondary}
      />
    </TouchableOpacity>
  );
};
