import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const tagStyles = (theme: Theme) => StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    transitionDuration: "0.2s",
    transitionProperty: "all",
    transitionTimingFunction: "ease-in-out",
  },
  containerLarge: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    transitionDuration: "0.2s",
    transitionProperty: "all",
    transitionTimingFunction: "ease-in-out",
  },
  text: {
    color: theme.colors.text.primary,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});