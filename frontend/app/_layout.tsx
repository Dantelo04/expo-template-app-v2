import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SessionProvider, useSession } from "@/context/SessionProvider";
import SplashScreenController from "./splash";
import { ThemeProvider } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { Header } from "@/components/Header/Header";
import { RecordsProvider } from "@/context/RecordsContext";
import { I18nProvider } from "@/context/I18nContext";
import "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { FilterProvider } from "@/context/FilterContext";
import { SortProvider } from "@/context/SortContext";
import { PermissionProvider, usePermission } from "@/context/PermissionContext";
import { WalletProvider } from "@/context/WalletContext";
import { enableScreens } from "react-native-screens";
import * as SystemUI from "expo-system-ui";
import * as NavigationBar from "expo-navigation-bar";
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import { Platform } from "react-native";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

// mobileAds().initialize();
enableScreens(true);

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Figtree-Regular": require("../assets/fonts/Figtree-Regular.ttf"),
    "Figtree-Medium": require("../assets/fonts/Figtree-Medium.ttf"),
    "Figtree-SemiBold": require("../assets/fonts/Figtree-SemiBold.ttf"),
    "Figtree-Bold": require("../assets/fonts/Figtree-Bold.ttf"),
    "Figtree-ExtraBold": require("../assets/fonts/Figtree-ExtraBold.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return (
    <SessionProvider>
      <PermissionProvider initialAccess={false}>
        <I18nProvider>
          <SplashScreenController />
          <RootLayoutNav />
        </I18nProvider>
      </PermissionProvider>
    </SessionProvider>
  );
}

function RootLayoutNav() {
  const { session, hasMainCurrency, user } = useSession();
  const { t } = useTranslation();
  const { grantAccess, revokeAccess } = usePermission();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync("#FEFAE0").catch(() => {});
    NavigationBar.setBackgroundColorAsync("#FEFAE0").catch(() => {});
    NavigationBar.setButtonStyleAsync("light").catch(() => {});
  }, []);

  useEffect(() => {
    if (Platform.OS === "ios") {
      Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_APPSTORE_KEY || "" });
    } else if (Platform.OS === "android") {
      Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_PLAYSTORE_KEY || "" });
    }

    checkAccess();
  }, [user?.permissions]);

  const checkAccess = async () => {
    const customerInfo = await Purchases.getCustomerInfo();

    if (
      typeof customerInfo.entitlements.active["Nekonomy Pro"] !== "undefined" ||
      user?.permissions === "admin" ||
      user?.permissions === "vip"
    ) {
      grantAccess();
    } else {
      revokeAccess();
    }
  };

  return (
    <ThemeProvider>
      <FilterProvider>
        <WalletProvider>
          <RecordsProvider>
            <SortProvider>
              <StatusBar style="dark" backgroundColor="transparent" translucent />
              <Stack
                screenOptions={{
                  headerShown: false,
                  title: "",
                }}
              >
              <Stack.Protected guard={session && hasMainCurrency}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="profile"
                  options={{
                    animation: "slide_from_left",
                    headerShown: true,
                    header(props) {
                      return <Header title={t("header.profile")} {...props} />;
                    },
                  }}
                />
                <Stack.Screen
                  name="account"
                  options={{
                    animation: "slide_from_left",
                    headerShown: true,
                    header(props) {
                      return <Header title={t("header.account")} {...props} />;
                    },
                  }}
                />
                <Stack.Screen
                  name="income"
                  options={{
                    presentation: "modal",
                    headerShown: true,
                    header(props) {
                      return (
                        <Header
                          paddingTop={Platform.OS === "ios" ? 24 : 16}
                          paddingBottom={8}
                          title={t("header.addIncome")}
                          {...props}
                        />
                      );
                    },
                  }}
                />
                <Stack.Screen
                  name="expense"
                  options={{
                    presentation: "modal",
                    headerShown: true,
                    header(props) {
                      return (
                        <Header
                          paddingTop={Platform.OS === "ios" ? 24 : 16}
                          paddingBottom={8}
                          title={t("header.addExpense")}
                          {...props}
                        />
                      );
                    },
                  }}
                />
                <Stack.Screen
                  name="editIncome"
                  options={{
                    presentation: "modal",
                    headerShown: true,
                    header(props) {
                      return (
                        <Header
                          paddingTop={Platform.OS === "ios" ? 24 : 16}
                          paddingBottom={8}
                          title={t("header.editIncome")}
                          {...props}
                        />
                      );
                    },
                  }}
                />
                <Stack.Screen
                  name="editExpense"
                  options={{
                    presentation: "modal",
                    headerShown: true,
                    header(props) {
                      return (
                        <Header
                          paddingTop={Platform.OS === "ios" ? 24 : 16}
                          paddingBottom={8}
                          title={t("header.editExpense")}
                          {...props}
                        />
                      );
                    },
                  }}
                />
                <Stack.Screen
                  name="categories"
                  options={{
                    presentation: "modal",
                    headerShown: true,
                    header(props) {
                      return (
                        <Header
                          title={t("header.categories")}
                          {...props}
                          paddingTop={Platform.OS === "ios" ? 24 : 16}
                          paddingBottom={0}
                        />
                      );
                    },
                  }}
                />
                <Stack.Screen
                  name="wallets"
                  options={{
                    presentation: "modal",
                    headerShown: true,
                    header(props) {
                      return (
                        <Header
                          title={t("header.wallets")}
                          {...props}
                          paddingTop={Platform.OS === "ios" ? 24 : 16}
                          paddingBottom={0}
                        />
                      );
                    },
                  }}
                />
                <Stack.Screen
                  name="currencyChange"
                  options={{
                    headerShown: true,
                    header(props) {
                      return (
                        <Header
                          title={t("header.changeCurrency")}
                          {...props}
                          paddingTop={16}
                          paddingBottom={16}
                        />
                      );
                    },
                  }}
                />
                <Stack.Screen
                  name="programmedRecords"
                  options={{
                    headerShown: true,
                    header(props) {
                      return (
                        <Header
                          title={t("header.programmedRecords")}
                          {...props}
                        />
                      );
                    },
                  }}
                />
                <Stack.Screen
                  name="recurrentRecords"
                  options={{
                    headerShown: true,
                    header(props) {
                      return (
                        <Header
                          title={t("header.recurrentRecords")}
                          {...props}
                        />
                      );
                    },
                  }}
                />
                <Stack.Screen
                  name="appInfo"
                  options={{
                    headerShown: true,
                    header(props) {
                      return <Header title={t("header.appInfo")} {...props} />;
                    },
                  }}
                />
                <Stack.Screen
                  name="selectLanguage"
                  options={{
                    headerShown: true,
                    header(props) {
                      return (
                        <Header title={t("header.selectLanguage")} {...props} />
                      );
                    },
                  }}
                />
                <Stack.Screen
                  name="reportsConfig"
                  options={{
                    headerShown: true,
                    header(props) {
                      return <Header title={t("header.reportsConfig")} {...props} />;
                    },
                  }}
                />
                <Stack.Screen
                  name="currency"
                  options={{
                    presentation: "modal",
                    headerShown: true,
                    header(props) {
                      return (
                        <Header
                          title={t("header.addCurrency")}
                          {...props}
                          paddingTop={Platform.OS === "ios" ? 24 : 16}
                          paddingBottom={12}
                        />
                      );
                    },
                  }}
                />
              </Stack.Protected>
              <Stack.Protected guard={session && !hasMainCurrency}>
                <Stack.Screen
                  name="onboarding"
                  options={{
                    headerShown: true,
                    header(props) {
                      return (
                        <Header
                          title={t("header.onboarding")}
                          {...props}
                          paddingTop={16}
                          paddingBottom={12}
                          showCloseButton={false}
                        />
                      );
                    },
                  }}
                />
              </Stack.Protected>
              </Stack>
            </SortProvider>
          </RecordsProvider>
        </WalletProvider>
      </FilterProvider>
    </ThemeProvider>
  );
}
