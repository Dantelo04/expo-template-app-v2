import { Theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const evalButtonStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    text: {
      color: theme.colors.text.currency,
    },
  });