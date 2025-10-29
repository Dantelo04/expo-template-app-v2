import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const recordLinkStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
  },
  income: {
    backgroundColor: theme.colors.semantic.successLight,
    boxShadow: `0px 3px 0px 0px ${theme.colors.semantic.success}`,
  },
  expense: {
    backgroundColor: theme.colors.semantic.warningLight,
    boxShadow: `0px 3px 0px 0px ${theme.colors.semantic.warning}`,
  },
  icon: {
    textAlign: "center",
  },
});