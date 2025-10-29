import { Theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const switchStyles = (theme: Theme) => StyleSheet.create({
  root: {
    padding: 4,
    borderRadius: 4,
    width: 56,
  },
  square: {
    width: 24,
    height: 24,
    borderRadius: 2,
    backgroundColor: theme.colors.basic.white,
  },
});