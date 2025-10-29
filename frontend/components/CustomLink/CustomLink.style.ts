import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const customLinkStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: theme.colors.text.secondary,
  },
  separator: {
    paddingLeft: 4,
  },
});