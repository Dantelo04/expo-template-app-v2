import { Theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const categoryIconStyles = (theme: Theme) => StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    lineHeight: 48,
    borderRadius: 4,
    backgroundColor: theme.colors.background.primary,
  },
});