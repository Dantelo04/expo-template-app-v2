import { Platform, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { titleCarouselStyles } from "./TitleCarousel.style";

interface ArrowProps {
  direction: "left" | "right";
  onPress: () => void;
  disabled?: boolean;
}

export const Arrow = ({ direction, onPress, disabled }: ArrowProps) => {
  const { theme } = useTheme();
  const styles = titleCarouselStyles(theme);
  const top = Platform.OS === "ios" ? 0 : 4;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={[
        styles.arrow,
        { opacity: disabled ? 0.5 : 1 },
        direction === "left"
          ? { left: 0, paddingLeft: 16, alignItems: "flex-start" }
          : { right: 0, paddingRight: 16, alignItems: "flex-end" },
      ]}
      disabled={disabled}
    >
      <FontAwesome6
        name={direction === "left" ? "chevron-left" : "chevron-right"}
        size={24}
        style={direction === "left" ? { left: 4, top} : { right: 4, top } }
        color={theme.colors.text.primary}
      />
    </TouchableOpacity>
  );
};
