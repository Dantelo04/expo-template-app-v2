import { TextInput, View } from "react-native";
import { searchInputStyles } from "./SearchInput.style";
import { useTheme } from "@/context/ThemeContext";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

interface SearchInputProps {
  onChangeText: (text: string) => void;
  value: string;
}

export const SearchInput = ({ onChangeText, value }: SearchInputProps) => {
  const { theme } = useTheme();
  const styles = searchInputStyles(theme);
  const { t } = useTranslation();
  
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={t('searchInput.placeholder')}
        placeholderTextColor={theme.colors.text.secondary}
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        cursorColor={theme.colors.primary[100]}
        selectionColor={theme.colors.primary[100]}
        autoFocus
      />
      <FontAwesome6 name="magnifying-glass" size={24} color={theme.colors.text.primary} />
    </View>
  );
};
