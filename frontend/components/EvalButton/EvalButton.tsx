import { useTheme } from "@/context/ThemeContext";
import { TouchableOpacity } from "react-native";
import { evalButtonStyles } from "./EvalButton.style";
import { Text } from "../Text/Text";
import { formatNumberSmooth } from "@/utils/numberFormat";

interface EvalButtonProps {
  onPress: () => void;
  value: number;
  marginTop?: number;
}

export const EvalButton = ({ onPress, value, marginTop = 0 }: EvalButtonProps) => {
  const { theme } = useTheme();
  const styles = evalButtonStyles(theme);
  
  return (
    <TouchableOpacity style={[styles.container, { marginTop }]} onPress={onPress}>
      <Text variant="body16_bold" style={styles.text}>{formatNumberSmooth(value.toString(), value.toString())}</Text>
    </TouchableOpacity>
  );
};