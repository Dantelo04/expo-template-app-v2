import { Theme } from "@/styles/theme";
import { Platform, StyleSheet } from "react-native";

export const titleCarouselStyles = (theme: Theme) => StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: theme.colors.background.primary,
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 2,
    borderColor: theme.colors.background.secondary,
  },
  carousel: {
    backgroundColor: theme.colors.background.primary,
    flexShrink: 0,
    flexGrow: 1,
  },
  title: {
    width: 200,
    textAlign: "center",
    color: theme.colors.text.primary,
  },
  arrow: {
    position: "absolute",
    height: 39,
    width: 50,
    backgroundColor: theme.colors.background.primary,
  },
  fallbackText: {
    textAlign: "center",
    width: "100%",
    paddingBottom: 12,
    opacity: 0.5,
    color: theme.colors.text.primary,
  },
});