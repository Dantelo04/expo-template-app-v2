import { StyleSheet } from "react-native";
import { Theme } from "../theme";

export const headerStyles = (theme: Theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.primary,
  },
});