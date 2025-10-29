import { Platform, StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const lockScreenStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "105%",
    width: "100%",
    paddingHorizontal: 32,
    gap: 32,
  },
  content: {
    gap: 24,
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 64,
  },
  blur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  title: {
    textAlign: "center",
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.colors.text.currency,
  },
  featureContainer: {
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    width: '100%',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 8,
    marginTop: -16,
    paddingHorizontal: 24,
  },
  feature: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingRight: 24,
  },
  featureText: {
    textAlign: 'left',
  },
  price: {
    textAlign: 'center',
    color: theme.colors.text.primary,
    opacity: 0.5,
    marginTop: -12,
  },
});