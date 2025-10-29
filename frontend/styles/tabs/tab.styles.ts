import { Theme } from "@/styles/theme";
import { Platform, StyleSheet } from "react-native";

const height = Platform.OS === "ios" ? 70 : 58;

export const tabStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.text.secondary,
      borderTopWidth: 1,
      borderColor: theme.colors.text.secondary,
      height: height,
      paddingTop: Platform.OS === "ios" ? 4 : 0,
      shadowOpacity: 0,
      shadowColor: "transparent",
      boxShadow: "none",
    },
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.text.secondary,
      borderWidth: 0,
      shadowOpacity: 0,
      boxShadow: "none",
      gap: 0,
    },
    tabBarLabelStyle: {
      fontSize: Platform.OS === "ios" ? 12 : 11,
      marginTop: 1,
      fontFamily: theme.typography.fontFamily.extraBold,
    },
    tabBarItemStyle: {
      height: Platform.OS === "ios" ? 65 : 55,
    },
  });
