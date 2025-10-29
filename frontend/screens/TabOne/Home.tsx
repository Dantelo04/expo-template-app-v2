import React from "react";
import { useSession } from "@/context/SessionProvider";
import { ScrollView, View } from "react-native";
import { Text } from "@/components/Text/Text";
import { useTheme } from "@/context/ThemeContext";
import { homeStyles } from "./Home.styles";
import { RecordLink } from "@/components/RecordLink/RecordLink";
import { RecordList } from "@/components/RecordList/RecordList";
import { CustomLink } from "@/components/CustomLink/CustomLink";
import { ExchangeRates } from "@/components/ExchangeRates/ExchangeRates";
import { ExpensePerCategory } from "@/components/ExpensePerCategory/ExpensePerCategory";
import { Evaluation } from "@/components/Evaluation/Evaluation";
import { ProgrammedRecordList } from "@/components/RecordList/ProgrammedRecordList";
import { useTranslation } from "react-i18next";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { RecurrentRecordList } from "@/components/RecordList/RecurrentRecordList";
import { IncomeByWallet } from "@/components/IncomeByWallet/IncomeByWallet";
import { useWallet } from "@/context/WalletContext";
import { Alert } from "@/components/Alert/Alert";

export const Home = () => {
  const { t } = useTranslation();
  const { error: sessionError } = useSession();
  const { theme } = useTheme();
  const styles = homeStyles(theme);
  const { user } = useSession();
  const { selectedWallet } = useWallet();

  return (
    <>
      <GestureHandlerRootView style={[styles.container, { paddingBottom: selectedWallet ? 24 : 0 }]}>
        {sessionError ? <Text variant="error">{sessionError}</Text> : null}
        <View style={styles.linksContainer}>
          <RecordLink income={true} />
          <RecordLink income={false} />
        </View>
        <GestureDetector gesture={Gesture.Native()}>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
            nestedScrollEnabled={true}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.recordListContainer}>
              <View style={styles.separatorContainer}>
                <Text variant="body20_bold">{t("home.lastRecords")}</Text>
                <CustomLink href="/recordList">{t("home.seeAll")}</CustomLink>
              </View>
              <RecordList howMany={2} />
            </View>
            <Evaluation />
            {user?.mainCurrency !== "usd" && <ExchangeRates />}
            <ExpensePerCategory />
            {selectedWallet === null && <IncomeByWallet />}
            <View style={styles.recordListContainer}>
              <View style={styles.separatorContainer}>
                <Text variant="body20_bold">{t("home.programmedRecords")}</Text>
                <CustomLink href="/programmedRecords">
                  {t("home.seeAll")}
                </CustomLink>
              </View>
              <ProgrammedRecordList howMany={2} />
            </View>
            <View style={styles.recordListContainer}>
              <View style={styles.separatorContainer}>
                <Text variant="body20_bold">{t("home.recurrentRecords")}</Text>
                <CustomLink href="/recurrentRecords">
                  {t("home.seeAll")}
                </CustomLink>
              </View>
              <RecurrentRecordList howMany={2} />
            </View>
            {/* <Signature marginTop={32} /> */}
          </ScrollView>
        </GestureDetector>
      </GestureHandlerRootView>
      {selectedWallet && <Alert type="icon" message={selectedWallet.split(".")[1]} icon={selectedWallet.split(".")[0]} />}
    </>
  );
};
