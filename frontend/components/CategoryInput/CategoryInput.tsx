import { TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { categoryInputStyles } from "./Category.style";
import { useState } from "react";
import { Input } from "../Input/Input";
import { Text } from "../Text/Text";
import { FontAwesome6 } from "@expo/vector-icons";
import { Button } from "../Button/Button";

interface CategoryInputProps {
  onCategoryChange: (category: string) => void;
  value: string;
  onFocus: () => void;
  onBlur: () => void;
  focused: boolean;
  loading: boolean;
  placeholder?: string;
}

export const CategoryInput = ({
  onCategoryChange,
  value,
  onFocus,
  onBlur,
  focused,
  loading,
  placeholder = "Food",
}: CategoryInputProps) => {
  const { theme } = useTheme();
  const styles = categoryInputStyles(theme);
  const [showInput, setShowInput] = useState(false);

  return (
    <View style={styles.container}>
      {focused ? (
          <Input
            placeholder={placeholder}
            value={value}
            onChangeText={onCategoryChange}
            autoFocus={showInput}
            style={styles.input}
            fullWidth={true}
            onFocus={onFocus}
            onBlur={onBlur}
          />
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setShowInput(true);
            onFocus();
          }}
          disabled={loading}
        >
          <FontAwesome6
            name="plus"
            size={28}
            color={theme.colors.background.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
