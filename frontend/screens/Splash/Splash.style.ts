import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const splashStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background.primary,
  },
  imageContainer: {
    width: 160,
    height: 183,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});