import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const iconSelectModalStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1000,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    content: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: 8,
      padding: 16,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
      maxWidth: 304,
    },
    iconContainer: {
      width: 56,
      height: 56,
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
      lineHeight: 54,
      alignItems: "center",
    },
    title: {
      width: 202,
      textAlign: "center",
    },
  });
