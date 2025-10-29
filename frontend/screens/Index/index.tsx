import { Image, Platform, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { Text } from "@/components/Text/Text";
import { indexStyles } from "./index.styles";
import { Button } from "@/components/Button/Button";
import { useSession } from "@/context/SessionProvider";
import { Splash } from "../Splash/Splash";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useI18n } from "@/context/I18nContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from "@/assets/data/constants";

const landingImage = require("@/assets/images/landing/landing-img.png");

interface IndexProps {
  isPending: boolean;
}

export const Index = ({ isPending }: IndexProps) => {
  const { theme } = useTheme();
  const { signInWithGoogle, signInWithApple, isLoading, isAppleLoading } = useSession();
  const styles = indexStyles(theme);
  const { t } = useI18n();

  if (isPending) return <Splash />;

  return (
    <LinearGradient
      colors={["#DBC7A8", "#FEFAE0"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 0.4 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.titleSection}>
          <Text
            variant="h1_extraBold"
            numberOfLines={2}
            style={{ textAlign: "center" }}
          >
            {t("index.title")}
          </Text>
          <Text
            variant="body20_medium"
            style={{ textAlign: "center", maxWidth: 380 }}
          >
            {t("index.description")}
          </Text>
        </View>
        <Image
          source={landingImage}
          resizeMode="contain"
          style={styles.landingImage}
        />
        <View style={styles.buttonContainer}>
          {Platform.OS === "ios" && (
            <Button
              variant="apple"
              onPress={signInWithApple}
              disabled={isLoading}
            >
              {isAppleLoading ? t("common.loading") : t("index.continueWithApple")}
            </Button>
          )}
          <Button
            variant="google"
            onPress={signInWithGoogle}
            disabled={isLoading}
          >
            {isLoading ? t("common.loading") : t("index.continueWithGoogle")}
          </Button>
          <Text variant="body14_medium" style={{ textAlign: "center" }}>
            {Platform.OS === "ios"
              ? t("index.continueWithAppleDescription")
              : t("index.continueWithGoogleDescription")}
          </Text>
          <Text
            variant="body12_medium"
            numberOfLines={2}
            style={{
              textAlign: "center",
              maxWidth: 240,
              marginHorizontal: "auto",
              opacity: 0.6,
            }}
          >
            {t("index.byContinuing")}{" "}
            <Link
              href={TERMS_OF_SERVICE_URL}
              style={{ textDecorationLine: "underline" }}
            >
              {t("index.termsOfService")}
            </Link>{" "}
            {t("common.and")}{" "}
            <Link
              href={PRIVACY_POLICY_URL}
              style={{ textDecorationLine: "underline" }}
            >
              {t("index.privacyPolicy")}
            </Link>
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
