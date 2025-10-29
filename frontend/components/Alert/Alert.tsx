import { useTheme } from "@/context/ThemeContext";
import { alertStyles } from "./Alert.style";
import { Text } from "../Text/Text";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useEffect } from "react";
import { FontAwesome6 } from "@expo/vector-icons";

interface AlertProps {
  type: "success" | "error" | "warning" | "info" | "icon";
  message: string;
  icon?: string;
}

export const Alert = ({ type, message, icon }: AlertProps) => {
  const { theme } = useTheme();
  const styles = alertStyles(theme);

  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 300 });
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });
  

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {type === "icon" && icon && <FontAwesome6 name={icon} size={16} color={theme.colors.background.primary} />}
      <Text variant="body18_bold" style={[styles.text, type === "icon" && { textTransform: "capitalize" }]}>{message}</Text>
    </Animated.View>
  );
};