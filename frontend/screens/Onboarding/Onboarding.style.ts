import { Theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const onboardingStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  description: {
    textAlign: "center",
    marginBottom: 24,
  },
});