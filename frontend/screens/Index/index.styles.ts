import { Platform, StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const indexStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    paddingHorizontal: 16,
    position: "relative",
  },
  titleSection: {
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -24,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  description: {
    textAlign: 'center',
    maxWidth: 350,
  },
  landingImage: {
    width: "100%",
    height: Platform.OS === "android" ? 310 : 340,
    objectFit: "contain",
    marginBottom: -48,
  },
  buttonContainer: {
    gap: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === "android" ? 16 : 24,
  },
  absoluteContainer: {
    width: "100%",
  },
  gradient: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    height: "100%",
  },
});