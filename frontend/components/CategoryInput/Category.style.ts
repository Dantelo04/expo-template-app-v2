import { Theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const categoryInputStyles = (theme: Theme) => StyleSheet.create({
  container: {
    width: "100%",
    gap: 12,
  },
  button: {
    backgroundColor: theme.colors.text.secondary,
    padding: 8,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    width: "100%", 
  },
  input: {
    width: "100%",
  },
  submitButton: {
    backgroundColor: theme.colors.text.secondary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});