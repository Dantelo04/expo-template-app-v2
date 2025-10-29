import { Dimensions, View } from "react-native";
import { titleCarouselStyles } from "./TitleCarousel.style";
import { useTheme } from "@/context/ThemeContext";
import { Arrow } from "./Arrow";
import { TitleItem } from "./TitleItem";
import React, { useEffect } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { FilterType } from "@/context/FilterContext";
import { useFilter } from "@/context/FilterContext";
import { useTranslation } from "react-i18next";
import { setDateFromTitle } from "./setDateFromTitle";
import { Text } from "../Text/Text";

interface TitleCarouselProps {
  titles: string[];
  setDate: (date: Date) => void;
  filter: FilterType;
}

const width = Dimensions.get("window").width;

export const TitleCarousel = ({
  titles,
  setDate,
  filter,
}: TitleCarouselProps) => {
  const { theme } = useTheme();
  const { shouldResetCarousel, resetCarousel, isLoading } = useFilter();
  const styles = titleCarouselStyles(theme);
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const currentDate = new Date();
  const { i18n, t } = useTranslation();

  const displayWeek = (lang: string, week: string) => {
    if (!week) return "";
    try {
      const parts = week.split("/");
      if (parts.length < 2) return week;
      return lang === "es"
        ? parts[0] + "/" + parts[1]
        : parts[1] + "/" + parts[0];
    } catch (error) {
      console.warn("Error processing week format:", error);
      return week;
    }
  };

  const onPressArrow = (index: number) => {
    if (!ref.current || !titles || titles.length === 0) return;
    ref.current.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const defaultIndex = titles && titles.length > 0 ? titles.length - 1 : 0;

  useEffect(() => {
    if (shouldResetCarousel && titles.length > 0 && ref.current) {
      progress.value = defaultIndex;
      resetCarousel();
      setDateFromTitle(defaultIndex, titles, filter, setDate, currentDate);
      ref.current.scrollTo({
        index: defaultIndex,
        animated: false,
      });
    }
  }, [titles]);

  if (!titles || titles.length === 0) {
    return (
      <View style={styles.container}>
        <Text variant="body14_medium" style={styles.fallbackText}>
          {t("reports.noRecords")}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        width={width}
        height={40}
        style={styles.carousel}
        defaultIndex={defaultIndex}
        data={titles}
        onProgressChange={progress}
        onSnapToItem={(index) => {
          setDateFromTitle(index, titles, filter, setDate, currentDate);
        }}
        renderItem={({ item }) => {
          if (!item || isLoading) {
            return (
              <TitleItem
                title=""
                width={"100%"}
                active={false}
                loading={isLoading}
              />
            );
          }

          let displayTitle = "";
          try {
            if (filter === "yearly") {
              displayTitle = item;
            } else if (filter === "weekly") {
              const weekParts = item.split(".");
              if (weekParts.length >= 1 && weekParts[0]) {
                const week1 = displayWeek(i18n.language, weekParts[0]);
                const week2 = weekParts[1]
                  ? displayWeek(i18n.language, weekParts[1])
                  : "";
                displayTitle = week1 + " - " + week2;
              }
            } else {
              const monthParts = item.split(".");
              if (monthParts.length >= 2 && monthParts[1]) {
                displayTitle = monthParts[1];
              }
            }
          } catch (error) {
            console.warn("Error processing title:", error);
            displayTitle = "Invalid";
          }

          return (
            <TitleItem
              title={displayTitle}
              width={"100%"}
              active
              loading={isLoading}
            />
          );
        }}
      />
      <Arrow
        direction="right"
        onPress={() => onPressArrow((progress.value || 0) + 1)}
      />
      <Arrow
        direction="left"
        onPress={() => onPressArrow((progress.value || 0) - 1)}
      />
    </View>
  );
};
