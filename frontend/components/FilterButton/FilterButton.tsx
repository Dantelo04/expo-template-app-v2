import { FontAwesome6 } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { filterButtonStyles } from "./FilterButton.style";
import { FilterType, useFilter } from "@/context/FilterContext";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { useRef } from "react";
import { FilterOption } from "./FilterOption";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SortType, useSort } from "@/context/SortContext";

interface FilterButtonProps {
  type?: "records" | "reports";
}

export const FilterButton = ({ type = "reports" }: FilterButtonProps) => {
  const { theme } = useTheme();
  const styles = filterButtonStyles(theme);
  const { filters, setCurrentFilter } = useFilter();
  const { sorts, setCurrentSort } = useSort();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const onPress = () => {
    actionSheetRef.current?.show();
  };

  const onFilterPress = (filter: string) => {
    setCurrentFilter(filter as FilterType);
    actionSheetRef.current?.hide();
  };

  const onSortPress = (sort: string) => {
    setCurrentSort(sort as SortType);
    actionSheetRef.current?.hide();
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        pressRetentionOffset={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <FontAwesome6
          name={type === "records" ? "sort" : "calendar"}
          solid
          size={26}
          color={theme.colors.text.secondary}
        />
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled={true}
        containerStyle={styles.actionSheet}
        indicatorStyle={styles.indicator}
        closeOnTouchBackdrop={true}
        defaultOverlayOpacity={0.3}
      >
        {type === "reports"
          ? filters.map((filter, index) => (
              <React.Fragment key={filter}>
                <FilterOption
                  title={filter}
                  onPress={() => onFilterPress(filter.toLowerCase())}
                  type="reports"
                />
                {index !== filters.length - 1 && (
                  <View style={styles.separator} />
                )}
              </React.Fragment>
            ))
          : sorts.map((sort, index) => (
              <React.Fragment key={sort}>
                <FilterOption
                  title={sort}
                  onPress={() => onSortPress(sort)}
                  type="records"
                />
                {index !== sorts.length - 1 && (
                  <View style={styles.separator} />
                )}
              </React.Fragment>
            ))}
      </ActionSheet>
    </>
  );
};
