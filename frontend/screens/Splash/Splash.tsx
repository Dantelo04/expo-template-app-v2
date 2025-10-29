import { useTheme } from "@/context/ThemeContext";
import { splashStyles } from "./Splash.style";
import { View, Image } from "react-native";

export const Splash = () => {
  const { theme } = useTheme();
  const styles = splashStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/logo-clean.png")}
          style={styles.image}
        />
      </View>
    </View>
  );
};
