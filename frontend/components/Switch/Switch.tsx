import { TouchableOpacity, View } from "react-native";
import { Text } from "../Text/Text";
import { useTheme } from "@/context/ThemeContext";
import { switchStyles } from "./Switch.style";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface SwitchProps {
  value: boolean;
  onPress: () => void;
}

export const Switch = ({ value, onPress }: SwitchProps) => {
  const { theme } = useTheme();
  const styles = switchStyles(theme);

  const animatedSquareStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(value ? 24 : 0) }],
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        value ? theme.colors.text.secondary : theme.colors.background.secondary
      ),
    };
  });

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Animated.View style={[styles.root, animatedStyle]}>
        <Animated.View style={[styles.square, animatedSquareStyle]} />
      </Animated.View>
    </TouchableOpacity>
  );
};
