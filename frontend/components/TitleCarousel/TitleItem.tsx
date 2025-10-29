import { useTheme } from "@/context/ThemeContext";
import { Text } from "../Text/Text";
import { titleCarouselStyles } from "./TitleCarousel.style";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";

interface TitleItemProps {
  title: string;
  width: number | "100%";
  active: boolean;
  loading?: boolean;
}

export const TitleItem = ({ title, width, active, loading }: TitleItemProps) => {
  const { theme } = useTheme();
  const styles = titleCarouselStyles(theme);

  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSpring(loading ? -8 : 0);
    opacity.value = withSpring(loading ? 0 : 1);  
  }, [loading]);

  const displayAnimation = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={displayAnimation}>
      <Text variant="body20_medium" style={[styles.title, { width, color: active ? theme.colors.text.primary : theme.colors.text.secondary }]}>{title}</Text>
    </Animated.View>
  );
};