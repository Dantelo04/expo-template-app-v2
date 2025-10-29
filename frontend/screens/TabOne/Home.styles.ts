import { Platform, StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

const paddingTop = Platform.OS === "ios" ? 16 : 0;

export const homeStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    paddingTop: paddingTop,
    position: "relative",
  },
  linksContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 8,
    marginBottom: 10,
    backgroundColor: theme.colors.background.primary,
    zIndex: 1,
  },
  logo: {
    fontSize: 46,
  },
  content: {
    flex: 1,
    width: '100%',
  },
  separatorContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recordListContainer: {
    flex: 1,
    gap: 4,
    marginBottom: -22,
  },
  separator: {
    color: theme.colors.text.primary,
  },
});