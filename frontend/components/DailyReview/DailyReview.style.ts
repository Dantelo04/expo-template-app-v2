import { Theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const dailyReviewStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      paddingHorizontal: 16,
    },
    content: {
      backgroundColor: theme.colors.background.secondary,
      padding: 12,
      borderRadius: 8,
      width: "100%",
    },
    subtitle: {
      color: theme.colors.text.primary,
    },
    footer: {
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
    },
  });