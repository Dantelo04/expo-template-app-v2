import { Theme } from "@/styles/theme";
import { StyleSheet } from "react-native";
import { DEFAULT_RECORDLIST_HEIGHT } from "@/assets/data/constants";

export const recordListStyles = (theme: Theme) => StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    position: "relative",
  },
  container: {
    width: "100%",
    paddingHorizontal: 16,
    minHeight: DEFAULT_RECORDLIST_HEIGHT,
  },
  separator: {
    height: 12,
  },
  emptyText: {
    opacity: 0.5,
    textAlign: "center",
    width: "100%",
  },
  absoluteTextContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    zIndex: 1000,
    opacity: 0.3,
  },
  absoluteText: {
    color: theme.colors.text.primary,
    maxWidth: 200,
    textAlign: "center",
    marginTop: -32,
  },
});