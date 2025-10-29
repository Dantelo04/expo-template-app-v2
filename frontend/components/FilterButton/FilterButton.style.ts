import { Theme } from "@/styles/theme";
import { Platform, StyleSheet } from "react-native";

export const filterButtonStyles = (theme: Theme) => StyleSheet.create({
  container: {
    padding: 8,
    marginRight: -8,
  },
  actionSheet: {
    backgroundColor: theme.colors.background.secondary,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 28 : 64,
  },
  indicator: {
    backgroundColor: theme.colors.text.primary,
    opacity: 0.2,
    width: 100,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 10,
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 2,
    backgroundColor: theme.colors.text.primary,
    opacity: 0.05,
    width: "90%",
    borderRadius: 1,
    marginHorizontal: "auto",
  },
});