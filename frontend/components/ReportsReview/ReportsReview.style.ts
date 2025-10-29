import { Theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const reportsReviewStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      paddingHorizontal: 16,
    },
    content: {
      backgroundColor: theme.colors.background.secondary,
      padding: 12,
      borderRadius: 8,
      gap: 18,
      width: "100%",
    },
    header: {
      gap: 2,
    },
    titleContainer: {
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
    },
    subtitle: {
      color: theme.colors.text.primary,
    },
    footer: {
        flexDirection: "row",
        gap: 24,
        alignItems: "center",
    },
    footerItem: {
        gap: 2,
    },
  });
