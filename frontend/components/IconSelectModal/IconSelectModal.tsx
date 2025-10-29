import { TouchableOpacity, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { iconSelectModalStyles } from "./IconSelectModal.style";
import { CATEGORIES_ICONS } from "@/assets/data/constants";
import { FontAwesome6 } from "@expo/vector-icons";
import {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { useEffect } from "react";

interface IconSelectModalProps {
  onSelect: (icon: string | null) => void;
  touchOutside: () => void;
}

export const IconSelectModal = ({
  onSelect,
  touchOutside,
}: IconSelectModalProps) => {
  const { theme } = useTheme();
  const styles = iconSelectModalStyles(theme);

  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSpring(0, {
      damping: 40,
      stiffness: 500,
    });
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={touchOutside}
      activeOpacity={1}
    >
      <Animated.View style={[styles.content, animatedStyle]}>
        {/* <Text variant="h4_bold" style={styles.title}>Select An Icon</Text> */}
        {CATEGORIES_ICONS.map((icon, index) => (
          <TouchableOpacity key={index} onPress={() => onSelect(icon)}>
            <FontAwesome6
              name={icon}
              style={styles.iconContainer}
              size={28}
              color={theme.colors.text.secondary}
            />
          </TouchableOpacity>
        ))}
      </Animated.View>
    </TouchableOpacity>
  );
};
