import { TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { actionButtonStyles } from "./ActionButton.style";
import { FontAwesome6 } from "@expo/vector-icons";

interface ActionButtonProps {
  type: "check" | "close" | "income" | "expense";
  onPress: () => void;
  size?: number;
  loading?: boolean;
}

export const ActionButton = ({ type = "check", onPress, size = 32, loading = false }: ActionButtonProps) => {
  const { theme } = useTheme();
  const styles = actionButtonStyles(theme);
  return (
    <TouchableOpacity
      style={[styles.container, type === "check" || type === "income" ? styles.check : styles.close, {width: size, height: size}, {opacity: loading ? 0.5 : 1}]}
      onPress={onPress}
      activeOpacity={0.5}
      disabled={loading}
      hitSlop={20}
    >
      {type === "check" || type === "income" ? (
        <FontAwesome6
          name={type === "check" ? "check" : "plus"}
          size={20}
          color={theme.colors.semantic.success}
          style={styles.icon}
        />
      ) : (
        <FontAwesome6
          name={type === "close" ? "xmark" : "minus"}
          size={20}
          color={theme.colors.semantic.warning}
          style={styles.icon}
        />
      )}
    </TouchableOpacity>
  );
};
