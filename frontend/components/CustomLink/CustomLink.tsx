import { Text } from "../Text/Text";
import { customLinkStyles } from "./CustomLink.style";
import { useTheme } from "@/context/ThemeContext";
import { FontAwesome6 } from "@expo/vector-icons";
import { RelativePathString, router } from "expo-router";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";

interface CustomLinkProps extends TouchableOpacityProps {
  children: React.ReactNode;
  href?: string;
}

export const CustomLink = ({ children, href = '/', ...props }: CustomLinkProps) => {
  const { theme } = useTheme();
  const styles = customLinkStyles(theme);

  return (
    <TouchableOpacity {...props} style={styles.container} activeOpacity={0.5} onPress={() => router.push(href as RelativePathString)}>
      <Text variant="body16_medium" style={styles.text}>
        {children}
      </Text>
      <View style={styles.separator}></View>
      <FontAwesome6
        name="arrow-right"
        size={14}
        color={theme.colors.text.secondary}
      />
    </TouchableOpacity>
  );
};
