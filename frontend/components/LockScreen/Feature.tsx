import { FontAwesome6 } from "@expo/vector-icons";
import { View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { Text } from "@/components/Text/Text";
import { lockScreenStyles } from "./LockScreen.style";

interface FeatureProps {
  title: string;
  icon: keyof typeof FontAwesome6.glyphMap;
}

export const Feature = ({ title, icon }: FeatureProps) => {
  const { theme } = useTheme();
  const styles = lockScreenStyles(theme);

  return (
    <View style={styles.feature}>
      <FontAwesome6 name={icon} size={24} color={theme.colors.text.currency} />
      <Text variant="body18_medium" style={styles.featureText} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
};