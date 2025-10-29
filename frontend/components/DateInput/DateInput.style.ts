import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const dateInputStyles = (theme: Theme) => StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 8,
    marginTop: 12,
  },
  text: {
    color: theme.colors.text.secondary,
  },
  androidContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: theme.colors.background.primary,
    paddingVertical: 4,
    paddingTop: 0,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.background.secondary,
    width: "100%",
  },
});