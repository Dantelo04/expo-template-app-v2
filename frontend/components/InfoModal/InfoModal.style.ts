import { Theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const infoModalStyles = (theme: Theme) =>
  StyleSheet.create({
    absoluteContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1000,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
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
      gap: 8,
      maxWidth: 304,
      marginTop: -24,
    },
    infoContainer: {
      width: 56,
      height: 56,
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
      lineHeight: 54,
      alignItems: "center",
    },
    title: {
      width: "100%",
      textAlign: "left",
    },
    description: {
      width: "100%",
      textAlign: "left",
      color: theme.colors.text.primary,
      opacity: 0.85,
      
    },
    separator: {
      width: "100%",
      height: 1,
      backgroundColor: theme.colors.text.primary,
      opacity: 0.1,
    },
  });
