import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const signatureStyles = (theme: Theme) => StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    opacity: 0.8,
  },
});