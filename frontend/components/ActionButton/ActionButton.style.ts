import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const actionButtonStyles = (theme: Theme) => StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -4,
  },
  check: {
    backgroundColor: theme.colors.semantic.successLight,
    boxShadow: `0px 3px 0px 0px ${theme.colors.semantic.success}`,
  },
  close: {
    backgroundColor: theme.colors.semantic.warningLight,
    boxShadow: `0px 3px 0px 0px ${theme.colors.semantic.warning}`,
  },
  icon: {
    textAlign: "center",
  },
});