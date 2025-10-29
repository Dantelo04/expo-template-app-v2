import { useTheme } from "@/context/ThemeContext";
import { Text } from "../Text/Text";
import { tagStyles } from "./Tag.styles";
import { TouchableOpacity, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

interface TagProps {
  text?: string;
  active?: boolean;
  onPress?: () => void;
  icon?: keyof typeof FontAwesome6.glyphMap;
  disabled?: boolean;
  capitalize?: boolean;
  type?: "small" | "large";
}

export const Tag = ({ text, active = false, onPress, icon, disabled = false, capitalize = false, type = "small" }: TagProps) => {
  const { theme } = useTheme();
  const styles = tagStyles(theme);

  return (
    <TouchableOpacity
      style={[
        type === "large" ? styles.containerLarge : styles.container,
        {
          backgroundColor: active
            ? theme.colors.text.currency
            : theme.colors.background.secondary,
          aspectRatio: icon ? 1 : undefined,
          opacity: disabled ? 0.5 : 1,
          paddingTop: icon ? 9.5 : undefined,
          maxWidth: icon ? 38 : undefined,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text variant={type === "large" ? "body20_medium" : "body16_medium"} style={[styles.text, {
        color: active ? theme.colors.basic.white : theme.colors.text.secondary,
        textTransform: capitalize ? "capitalize" : "none",
        paddingRight: capitalize ? 1 : undefined,
      }]}>
        {icon ? (
          <FontAwesome6 name={icon} size={18} color={theme.colors.text.primary}/>
        ) : (
          text
        )}
      </Text>
    </TouchableOpacity>
  );
};
