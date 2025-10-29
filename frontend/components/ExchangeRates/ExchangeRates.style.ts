import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const exchangeRatesStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16,
      gap: 6,
    },
    exchangeContainer: {
      flex: 1,
      backgroundColor: theme.colors.background.secondary,
      padding: 12,
      width: "100%",
      borderRadius: 8,
      minHeight: 71,
    },
    exchangeContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: -4,
    },
    exchangeRate: {
      color: theme.colors.semantic.success,
      textTransform: "uppercase",
    },
    titleContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 4,
    },
    currencyContainer: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    currencyText: {
      color: theme.colors.semantic.warningDarker,
      textTransform: "uppercase",
    },
    amountContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
  });