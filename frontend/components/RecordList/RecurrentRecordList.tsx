import { useTheme } from "@/context/ThemeContext";
import { FlatList, View } from "react-native";
import { recordListStyles } from "./RecordList.style";
import { Record } from "@/lib/actions/createRecord";
import { Record as RecordComponent } from "../Record/Record";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSession } from "@/context/SessionProvider";
import { RecordFallback } from "../Record/RecordFallback";
import { useRecords } from "@/context/RecordsContext";
import { Text } from "../Text/Text";
import { useTranslation } from "react-i18next";
import { sortRecords } from "@/utils/sortRecords";
interface RecurrentRecordListProps {
  howMany?: number;
  flatList?: boolean;
}

export const RecurrentRecordList = ({
  howMany,
  flatList,
}: RecurrentRecordListProps) => {
  const { theme } = useTheme();
  const styles = recordListStyles(theme);
  const { user } = useSession();
  const { recurrentRecords, isLoading, refreshRecords, enqueueDelete } =
    useRecords();
  const { t } = useTranslation();
  const [sortedRecords, setSortedRecords] = useState<Record[]>([]);

  const sortRecordsFunction = async () => {
    try {
      const sortedRecords = await sortRecords(
        recurrentRecords || [],
        "Amount (Descending)",
        user?.mainCurrency || "pyg"
      );
      setSortedRecords(sortedRecords || []);
    } catch (error) {
      console.error("Error sorting records:", error);
      setSortedRecords(recurrentRecords || []);
    }
  };

  useEffect(() => {
    sortRecordsFunction();
  }, [recurrentRecords]);

  useFocusEffect(
    useCallback(() => {
      refreshRecords();
    }, [refreshRecords])
  );

  const handleDelete = (id: string) => {
    enqueueDelete(id);
  };

  return !flatList ? (
    <GestureHandlerRootView style={styles.root}>
      {recurrentRecords?.length === 0 && (
        <View style={styles.absoluteTextContainer}>
          <Text
            variant="body18_medium"
            style={[styles.absoluteText, { maxWidth: 180 }]}
          >
            {t("recurrentRecordList.fallbackText")}
          </Text>
        </View>
      )}
      <View
        style={[
          styles.container,
          { opacity: recurrentRecords?.length === 0 ? 0.6 : 1 },
        ]}
      >
        {recurrentRecords &&
        recurrentRecords.length > 0 &&
        recurrentRecords.length !== 1 ? (
          sortedRecords
            .slice(0, howMany ? howMany : sortedRecords.length)
            .map((record) => (
              <RecordComponent
                key={record.id}
                record={record}
                onDelete={handleDelete}
                mainCurrency={user?.mainCurrency || ""}
                type="recurrent"
              />
            ))
        ) : recurrentRecords && recurrentRecords.length === 1 ? (
          <View style={[styles.container, { paddingHorizontal: 0 }]}>
            <RecordComponent
              key={recurrentRecords[0].id}
              record={recurrentRecords[0]}
              onDelete={handleDelete}
              mainCurrency={user?.mainCurrency || ""}
              type="recurrent"
            />
            <RecordFallback />
          </View>
        ) : (
          <View style={[styles.container, { paddingHorizontal: 0 }]}>
            <RecordFallback />
            <RecordFallback />
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  ) : (
    <GestureHandlerRootView style={styles.root}>
      <FlatList
        data={sortedRecords.slice(0, howMany ? howMany : sortedRecords.length)}
        renderItem={({ item }) => (
          <RecordComponent
            record={item}
            onDelete={handleDelete}
            mainCurrency={user?.mainCurrency || ""}
            type="recurrent"
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.container}
        ListEmptyComponent={() => (
          <View style={[styles.container, { paddingHorizontal: 0 }]}>
            {isLoading ? (
              <>
                <RecordFallback />
                <RecordFallback />
              </>
            ) : (
              <Text variant="body14_medium" style={styles.emptyText}>
                {t("recurrentRecordList.noRecords")}
              </Text>
            )}
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
};
