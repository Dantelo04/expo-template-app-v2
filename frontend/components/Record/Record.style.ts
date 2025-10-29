import { Theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const recordStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: theme.colors.background.secondary,
      paddingHorizontal: 8,
      paddingRight: 12,
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: "center",
      width: "100%",
      overflow: "hidden",
      zIndex: 1,
      flexShrink: 0,
      // height: "100%",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 8,
      width: "55%",
    },
    titleContainer: {
      flex: 1,
      justifyContent: "center",
      maxWidth: 145,
      position: "relative",
    },
    title: {
      color: theme.colors.text.primary,
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: 14,
      maxWidth: 190,
    },
    titleMask: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "transparent",
    },
    date: {
      color: theme.colors.text.secondary,
      textOverflow: "ellipsis",
      overflow: "hidden",
      maxWidth: 190,
    },
    amountIncome: {
      color: theme.colors.semantic.success,
    },
    convertedAmountIncome: {
      color: theme.colors.semantic.successDark,
    },
    convertedAmountExpense: {
      color: theme.colors.semantic.warningDark,
    },
    amountExpense: {
      color: theme.colors.semantic.warning,
    },
    currencyIncome: {
      color: theme.colors.semantic.successLight,
    },
    currencyExpense: {
      color: theme.colors.semantic.warningLight,
    },
    currency: {
      color: theme.colors.text.currency,
    },
    amountContainer: {
      display: "flex",
      flexDirection: "row",

      gap: 2,
    },
    amountsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },
    relativeContainer: {
      position: "relative",
    },
    iconWrapper: {
      position: "absolute",
      right: 0,
      top: 0,
      justifyContent: "center",
      alignItems: "center",
      height: "94%",
      width: 64,
      zIndex: -1,
      backgroundColor: theme.colors.semantic.warningLight,
      borderRadius: 8,
      overflow: "hidden",
    },
    blank: {
      height: 14,
      width: 100,
      backgroundColor: theme.colors.background.primary,
      borderRadius: 8,
    },
    actionSheet: {
      backgroundColor: theme.colors.background.secondary,
      paddingTop: 8,
      paddingBottom: 64,
      paddingHorizontal: 16,
    },
    indicator: {
      backgroundColor: theme.colors.text.primary,
      opacity: 0.2,
      marginBottom: 12,
    },
    actionSheetTitle: {
      color: theme.colors.text.primary,
      fontFamily: theme.typography.fontFamily.medium,
      marginBottom: 18,
      textAlign: "center",
      opacity: 0.4,
    },
    pressableHover: {
      transitionDuration: "150ms",
      transitionProperty: "opacity",
      transitionTimingFunction: "ease-in-out",
    },
  });
