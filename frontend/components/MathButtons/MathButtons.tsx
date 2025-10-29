import { View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { mathButtonsStyles } from "./MathButtons.style";
import { MATH_ICONS } from "@/assets/data/constants";
import { Tag } from "../Tag/Tag";

interface MathButtonsProps {
  onMathPress: (icon: string) => void;
}

export const MathButtons = ({ onMathPress }: MathButtonsProps) => {
  const { theme } = useTheme();
  const styles = mathButtonsStyles(theme);

  return (
    <View style={styles.container}>
      {MATH_ICONS.map((icon) => (
        <Tag key={icon} icon={icon.split(".")[0]} onPress={() => onMathPress(icon)} />
      ))}
      <Tag icon="equals" onPress={() => onMathPress("equals")} />
    </View>
  );
};
