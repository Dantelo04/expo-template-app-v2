import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const profileButtonStyles = (theme: Theme) => StyleSheet.create({
  profile: {
    borderRadius: 100,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 100,
  },
});