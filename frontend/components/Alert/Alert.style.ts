import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const alertStyles = (theme: Theme) => StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 6,
    justifyContent: "center",
    backgroundColor: theme.colors.text.primary,
    zIndex: 1000,
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  text: {
    color: theme.colors.background.primary,
    textAlign: "center",
  },
});