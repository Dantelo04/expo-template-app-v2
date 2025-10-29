import { View } from "react-native";
import { Text } from "@/components/Text/Text";
import { NativeStackNavigationOptions, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Route } from "@react-navigation/native";
import { headerStyle } from "./Header.style";
import { useTheme } from "@/context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ActionButton } from "../ActionButton/ActionButton";

interface HeaderProps {
  title: string;
  paddingTop?: number;
  paddingBottom?: number;
  back?: {
    title: string | undefined;
    href: string | undefined;
  };
  options: NativeStackNavigationOptions;
  route: Route<string>;
  navigation: NativeStackNavigationProp<any>;
  showCloseButton?: boolean;
}

export const Header = ({paddingTop = 8, paddingBottom = 8, title, showCloseButton = true, ...props}: HeaderProps) => {
  const { theme } = useTheme();
  const styles = headerStyle(theme);
  
  return (
    <SafeAreaView style={[styles.container, { paddingTop: paddingTop, paddingBottom: paddingBottom }]} edges={["top"]}>
      <Text variant="h3_bold">{title}</Text>
      {showCloseButton && <ActionButton type="close" onPress={() => router.back()} />}
    </SafeAreaView>
  );
};