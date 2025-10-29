import { TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { recordLinkStyles } from "./RecordLink.styles";
import { router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";

interface RecordLinkProps {
  income?: boolean;
}

export const RecordLink = ({ income = true }: RecordLinkProps) => {
  const { theme } = useTheme();
  const styles = recordLinkStyles(theme);

  return (
    <TouchableOpacity
      style={[styles.container, income ? styles.income : styles.expense]}
      onPress={() => {
        router.push(income ? "/income" : "/expense");
      }}
      activeOpacity={0.5}
    >
      {income ? (
        <FontAwesome6
          name="plus"
          size={32}
          color={theme.colors.semantic.success}
          style={styles.icon}
        />
      ) : (
        <FontAwesome6
          name="minus"
          size={32}
          color={theme.colors.semantic.warning}
          style={styles.icon}
        />
      )}
    </TouchableOpacity>
  );
};
