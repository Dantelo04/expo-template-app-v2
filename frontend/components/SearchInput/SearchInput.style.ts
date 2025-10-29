import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const searchInputStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 8,
    width: '100%',
    boxShadow: `0px 3px 0px 0px ${theme.colors.text.primary}`,
    paddingRight: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.fontSize['xl'],
    fontFamily: theme.typography.fontFamily.medium,
    paddingVertical: 12,
    paddingLeft: 12,
    width: '100%',
    color: theme.colors.text.primary,
  },
});