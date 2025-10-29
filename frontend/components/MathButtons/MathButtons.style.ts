import { Theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const mathButtonsStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
    flexWrap: "wrap",
    marginTop: 4,
  },
});
