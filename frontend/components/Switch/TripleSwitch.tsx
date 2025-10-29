import { TouchableOpacity, View } from "react-native";
import { Text } from "../Text/Text";
import { useTheme } from "@/context/ThemeContext";
import { switchStyles } from "./Switch.style";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface TripleSwitchProps {
  value: "programmed" | "recurrent" | "off";
  onPress: () => void;
}

export const TripleSwitch = ({ value, onPress }: TripleSwitchProps) => {
  const { theme } = useTheme();
  const styles = switchStyles(theme);

  const animatedSquareStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(value === "programmed" ? 24 : value === "recurrent" ? 48 : 0) }],
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        value === "programmed" ? theme.colors.text.secondary : value === "recurrent" ? theme.colors.primary[100] : theme.colors.background.secondary
      ),
    };
  });

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Animated.View style={[styles.root, animatedStyle, { width: 80}]}>
        <Animated.View style={[styles.square, animatedSquareStyle]} />
      </Animated.View>
    </TouchableOpacity>
  );
};
