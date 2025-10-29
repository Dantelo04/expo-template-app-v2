import { View } from "react-native";
import { CategoryIcon } from "../CategoryIcon/CategoryIcon";
import { useTheme } from "@/context/ThemeContext";
import { recordStyles } from "./Record.style";

export const RecordFallback = () => {
  const { theme } = useTheme();
  const styles = recordStyles(theme);

  return (
    <View style={[styles.container, { height: 59, marginBottom: 4, width: "100%", opacity: 0.85 }]}>
      <View style={[styles.header]}>
          <CategoryIcon
            icon=""
            onPress={() => {}}
            pressable={false}
          />
        <View style={[styles.titleContainer, { gap: 2 }]}>
          <View style={[styles.blank, { width: 120 }]} />
          <View style={[styles.blank, { width: 80 }]} />
        </View>
      </View>
      <View style={[styles.amountsContainer, { gap: 2 }]}>
          <View style={[styles.blank, { width: 60 }]} />
          <View style={[styles.blank, { width: 50 }]} />
      </View>
    </View>
  );
};
