import { View } from "react-native";
import { categoryShowerStyles } from "./CategoryShower.style";
import { Tag } from "../Tag/Tag";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

interface CategoryShowerProps {
  onCategoryPress: (category: string) => void;
  categories: string[];
  category: string;
}

export const CategoryShower = ({ onCategoryPress, categories, category }: CategoryShowerProps) => {
  const { theme } = useTheme();
  const styles = categoryShowerStyles(theme);

  return (
    <View style={styles.container}>
      {categories.map((item) => (
        <Tag
          key={item}
          active={category === item}
          text={item.split(".")[1]}
          onPress={() => onCategoryPress(item)}
          capitalize
        />
      ))}
      <Tag
        icon="plus"
        text="Add Category"
        onPress={() => {
          router.push("/categories");
        }}
      />
    </View>
  );
};
