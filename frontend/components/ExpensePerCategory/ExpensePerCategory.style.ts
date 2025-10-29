import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const expensePerCategoryStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16,
      gap: 6,
    },
    chartContainer: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background.secondary,
      gap: 16,
      borderRadius: 8,
    },
    contentContainer: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: 12,
      paddingRight: 0,
    },
    itemContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      width: "100%",
      paddingLeft: 12,
    },
    itemContent: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 6,
    },
    itemText: {
      textTransform: "capitalize",
      color: theme.colors.text.primary,
      maxWidth: 80,
    },
    separator: {
      width: 2,
      height: "100%",
      backgroundColor: theme.colors.text.primary,
      opacity: 0.05,
    },
    pieChartContainer: {
      marginVertical: 12,
      marginRight: 12,
    },
  });