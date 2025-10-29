import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const evaluationStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16,
      gap: 6,
    },
    evaluationContainer: {
      flex: 1,
      backgroundColor: theme.colors.background.secondary,
      padding: 12,
      width: "100%",
      borderRadius: 8,
      gap: 12,
    },
    itemContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    itemText: {
      color: theme.colors.text.primary,
    },
    incomeText: {
      color: theme.colors.semantic.success,
    },
    expenseText: {
      color: theme.colors.semantic.warning,
    },
    separator: {
      width: "100%",
      height: 2,
      backgroundColor: theme.colors.text.primary,
      opacity: 0.05,
      borderRadius: 1,
    },
  });