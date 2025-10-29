import { useTheme } from "@/context/ThemeContext";
import { FlatList, View } from "react-native";
import { recordListStyles } from "./RecordList.style";
import { Record } from "@/lib/actions/createRecord";
import { Record as RecordComponent } from "../Record/Record";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSession } from "@/context/SessionProvider";
import { RecordFallback } from "../Record/RecordFallback";
import { useRecords } from "@/context/RecordsContext";
import { Text } from "../Text/Text";
import { useTranslation } from "react-i18next";

interface ProgrammedRecordListProps {
  howMany?: number;
  flatList?: boolean;
}

export const ProgrammedRecordList = ({ howMany, flatList }: ProgrammedRecordListProps) => {
  const { theme } = useTheme();
  const styles = recordListStyles(theme);
  const { user } = useSession();
  const { 
    programmedRecords, 
    isLoading, 
    refreshRecords, 
    enqueueDelete, 
  } = useRecords();
  const { t } = useTranslation();
  
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
      {programmedRecords?.length === 0 && (
        <View style={styles.absoluteTextContainer}>
          <Text variant="body18_medium" style={[styles.absoluteText, { maxWidth: 180 }]}>{t('programmedRecordList.fallbackText')}</Text>
        </View>
      )}
      <View style={[styles.container, { opacity: programmedRecords?.length === 0 ? 0.6 : 1 }]}>
        {programmedRecords &&
        programmedRecords.length > 0 &&
        programmedRecords.length !== 1 ? (
          programmedRecords
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, howMany ? howMany : programmedRecords.length)
            .map((record) => (
              <RecordComponent
                key={record.id}
                record={record}
                onDelete={handleDelete}
                mainCurrency={user?.mainCurrency || ""}
                type="programmed"
              />
            ))
        ) : programmedRecords && programmedRecords.length === 1 ? (
          <View style={[styles.container, { paddingHorizontal: 0 }]}>
            <RecordComponent
              key={programmedRecords[0].id}
              record={programmedRecords[0]}
              onDelete={handleDelete}
              mainCurrency={user?.mainCurrency || ""}
              type="programmed"
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
        data={programmedRecords
          ?.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, howMany ? howMany : programmedRecords.length)}
        renderItem={({ item }) => (
          <RecordComponent
            record={item}
            onDelete={handleDelete}
            mainCurrency={user?.mainCurrency || ""}
            type="programmed"
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
                {t('programmedRecordList.noRecords')}
              </Text>
            )}
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
};
