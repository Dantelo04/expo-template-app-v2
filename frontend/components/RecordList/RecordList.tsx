import { useTheme } from "@/context/ThemeContext";
import { FlatList, View } from "react-native";
import { recordListStyles } from "./RecordList.style";
import { Record } from "@/lib/actions/createRecord";
import { Record as RecordComponent } from "../Record/Record";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSession } from "@/context/SessionProvider";
import { RecordFallback } from "../Record/RecordFallback";
import { useRecords } from "@/context/RecordsContext";
import { Text } from "../Text/Text";
import { useTranslation } from "react-i18next";

interface RecordListProps {
  howMany?: number;
  flatList?: boolean;
  sortedRecords?: Record[];
}

export const RecordList = ({
  howMany,
  flatList,
  sortedRecords,
}: RecordListProps) => {
  const { theme } = useTheme();
  const styles = recordListStyles(theme);
  const { user } = useSession();
  const { t } = useTranslation();

  const { records, isLoading, enqueueDelete } = useRecords();

  const handleDelete = (id: string) => {
    enqueueDelete(id);
  };

  return !flatList ? (
    <GestureHandlerRootView style={styles.root}>
      {records?.length === 0 && (
        <View style={styles.absoluteTextContainer}>
          <Text variant="body18_medium" style={styles.absoluteText}>
            {t("recordList.fallbackText")}
          </Text>
        </View>
      )}
      <View
        style={[styles.container, { opacity: records?.length === 0 ? 0.6 : 1 }]}
      >
        {records && records.length > 0 && records.length !== 1 ? (
          records
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, howMany ? howMany : records.length)
            .map((record) => (
              <RecordComponent
                key={record.id}
                record={record}
                onDelete={handleDelete}
                mainCurrency={user?.mainCurrency || ""}
              />
            ))
        ) : records && records.length === 1 ? (
          <View style={[styles.container, { paddingHorizontal: 0 }]}>
            <RecordComponent
              key={records[0].id}
              record={records[0]}
              onDelete={handleDelete}
              mainCurrency={user?.mainCurrency || ""}
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
    <GestureHandlerRootView style={[styles.root]}>
      <FlatList
        data={
          sortedRecords && sortedRecords.length > 0
            ? sortedRecords.slice(0, howMany ? howMany : sortedRecords.length)
            : records && records.length > 0
            ? records.slice(0, howMany ? howMany : records.length)
            : []
        }
        renderItem={({ item }) => (
          <RecordComponent
            record={item}
            onDelete={handleDelete}
            mainCurrency={user?.mainCurrency || ""}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 48 }}
        ListEmptyComponent={() => (
          <View style={[styles.container, { paddingHorizontal: 0 }]}>
            {isLoading ? (
              <>
                <RecordFallback />
                <RecordFallback />
              </>
            ) : (
              <Text variant="body14_medium" style={styles.emptyText}>
                {t("recordList.fallbackText")}
              </Text>
            )}
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
};
