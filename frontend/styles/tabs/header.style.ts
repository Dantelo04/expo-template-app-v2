import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";


export const headerStyle = (theme: Theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 0,
  },
});
