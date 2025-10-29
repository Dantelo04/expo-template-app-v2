import { Theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const cashFlowStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    width: "100%",
    paddingHorizontal: 16,
    gap: 8,
  },
  title: {
    color: theme.colors.text.primary,
  },
  graphContainer: {
    gap: 12,
    width: "100%",
    backgroundColor: theme.colors.background.secondary,
    padding: 12,
    paddingTop: 16,
    borderRadius: 8,
    height: 280,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
    width: "100%",
    padding: 12,
  },
  footerText: {
    color: theme.colors.text.primary,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dataPoint: {
    width: 8,
    height: 8,
    borderRadius: 6,
  }
});