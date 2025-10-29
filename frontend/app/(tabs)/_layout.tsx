import React from "react";
import { Tabs } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { tabStyles } from "@/styles/tabs/tab.styles";
import { headerStyle } from "@/styles/tabs/header.style";
import { ProfileButton } from "@/components/ProfileButton/ProfileButton";
import { FontAwesome6 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";
import { FilterButton } from "@/components/FilterButton/FilterButton";
import { WalletButton } from "@/components/WalletButton/WalletButton";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome6>["name"];
  color: string;
}) {
  return <FontAwesome6 size={Platform.OS === "ios" ? 26 : 24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { theme } = useTheme();
  const styles = tabStyles(theme);
  const headerStyles = headerStyle(theme);
  const { t } = useTranslation();

  const rippleColor = theme.colors.text.primary + "20";
  const rippleRadius = 45;

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={Platform.OS === "ios" ? [] : ["bottom"]}
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.text.primary,
          tabBarInactiveTintColor: theme.colors.background.primary,
          tabBarShowLabel: false,
          tabBarStyle: styles.container,
          headerStyle: headerStyles.container,
          headerShadowVisible: false,
          headerTitle: new Date().toLocaleDateString(
            i18n.language === "es" ? "es-ES" : "en-US",
            {
              weekday: "short",
              month: "long",
              day: "numeric",
            }
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: theme.typography.fontFamily.medium,
            fontWeight: "500",
            color: theme.colors.text.secondary,
            textAlign: "center",
            textTransform: "capitalize",
          },
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
          headerRightContainerStyle: {
            paddingRight: 16,
          },
          headerLeft: () => <ProfileButton />,
          lazy: true,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="house" color={color} />
            ),
            tabBarItemStyle: styles.tabBarItemStyle,
            tabBarShowLabel: true,
            tabBarLabel: t("tabs.home"),
            tabBarLabelStyle: styles.tabBarLabelStyle,
            headerRight: () => <WalletButton/>,
            tabBarButton: (props) =>
              Platform.OS === "android" ? (
                <TouchableNativeFeedback
                  onPress={props.onPress}
                  useForeground={true}
                  background={TouchableNativeFeedback.Ripple(
                    rippleColor,
                    false,
                    rippleRadius,
                  )}
                >
                  <View style={[props.style, { overflow: "hidden" }]}>
                    {props.children}
                  </View>
                </TouchableNativeFeedback>
              ) : (
                <TouchableOpacity
                  onPress={props.onPress}
                  activeOpacity={0.7}
                  style={props.style}
                >
                  {props.children}
                </TouchableOpacity>
              ),
          }}
        />
        <Tabs.Screen
          name="recordList"
          options={{
            title: "Records",
            headerRight: () => <FilterButton type="records" />,
            tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
            tabBarShowLabel: true,
            tabBarLabel: t("tabs.records"),
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarItemStyle: styles.tabBarItemStyle,
            tabBarButton: (props) =>
              Platform.OS === "android" ? (
                <TouchableNativeFeedback
                  onPress={props.onPress}
                  useForeground={true}
                  background={TouchableNativeFeedback.Ripple(
                    rippleColor,
                    false,
                    rippleRadius
                  )}
                >
                  <View style={[props.style, { overflow: "hidden" }]}>
                    {props.children}
                  </View>
                </TouchableNativeFeedback>
              ) : (
                <TouchableOpacity
                  onPress={props.onPress}
                  activeOpacity={0.7}
                  style={props.style}
                >
                  {props.children}
                </TouchableOpacity>
              ),
          }}
        />
        <Tabs.Screen
          name="reports"
          options={{
            title: "Reports",
            headerRight: () => <FilterButton />,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="chart-simple" color={color} />
            ),
            tabBarShowLabel: true,
            tabBarLabel: t("tabs.reports"),
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarItemStyle: styles.tabBarItemStyle,
            tabBarButton: (props) =>
              Platform.OS === "android" ? (
                <TouchableNativeFeedback
                  onPress={props.onPress}
                  useForeground={true}
                  background={TouchableNativeFeedback.Ripple(
                    rippleColor,
                    false,
                    rippleRadius
                  )}
                >
                  <View style={[props.style, { overflow: "hidden" }]}>
                    {props.children}
                  </View>
                </TouchableNativeFeedback>
              ) : (
                <TouchableOpacity
                  onPress={props.onPress}
                  activeOpacity={0.7}
                  style={props.style}
                >
                  {props.children}
                </TouchableOpacity>
              ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
