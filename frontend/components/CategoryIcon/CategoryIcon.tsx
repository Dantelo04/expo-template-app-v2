import { useTheme } from "@/context/ThemeContext";
import { categoryIconStyles } from "./CategoryIcon.style";
import { FontAwesome6 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface CategoryIconProps {
  icon: string;
  onPress: () => void;
  pressable?: boolean;
}

export const CategoryIcon = ({ icon, onPress, pressable = true }: CategoryIconProps) => {
  const { theme } = useTheme();
  const styles = categoryIconStyles(theme);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={pressable ? 0.9 : 1}>
      {icon && icon !== "" && <FontAwesome6
        name={icon}
        size={20}
        color={theme.colors.text.secondary}
      />}
    </TouchableOpacity>
  );
};
