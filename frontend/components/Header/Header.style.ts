import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const headerStyle = (theme: Theme) => StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.background.primary,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});