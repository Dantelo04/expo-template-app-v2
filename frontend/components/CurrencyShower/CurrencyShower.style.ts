import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const currencyShowerStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      gap: 4,
      flexWrap: "wrap",
      marginTop: 4,
    },
  });
