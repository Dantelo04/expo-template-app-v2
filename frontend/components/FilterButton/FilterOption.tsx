import { Text } from "../Text/Text";
import { useTheme } from "@/context/ThemeContext";
import { filterButtonStyles } from "./FilterButton.style";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native-gesture-handler";
import { SortType, useSort } from "@/context/SortContext";
import { FilterType, useFilter } from "@/context/FilterContext";

interface FilterOptionProps {
  title: string;
  onPress: () => void;
  type?: "records" | "reports";
}

export const FilterOption = ({
  title,
  onPress,
  type = "reports",
}: FilterOptionProps) => {
  const { theme } = useTheme();
  const styles = filterButtonStyles(theme);
  const { t } = useTranslation();
  const { translatedSorts, currentSort } = useSort();
  const { translatedFilters, currentFilter } = useFilter();

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: theme.colors.background.secondary,
        borderless: false,
      }}
      style={({ hovered, pressed }) => [
        styles.button,
        (hovered || pressed) && { opacity: 0.5 },
      ]}
    >
      {type === "reports" ? (
        <Text
          variant="body20_medium"
          style={{
            color:
              title.toLowerCase() === currentFilter.toLowerCase()
                ? theme.colors.text.primary
                : theme.colors.text.secondary,
          }}
        >
          {translatedFilters(title as FilterType)}
        </Text>
      ) : (
        <Text
          variant="body20_medium"
          style={{
            color:
              title === currentSort
                ? theme.colors.text.primary
                : theme.colors.text.secondary,
          }}
        >
          {title === "Default"
            ? t("sortOption.default")
            : translatedSorts(title as SortType)}
        </Text>
      )}
    </Pressable>
  );
};
