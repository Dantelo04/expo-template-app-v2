import { Theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const walletShowerStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    gap: 4,
    flexWrap: "wrap",
    marginTop: 4,
  },
});