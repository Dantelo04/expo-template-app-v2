import { Image, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { profileButtonStyles } from "./ProfileButton.style";
import { useNavigation } from "@react-navigation/native";
import { useSession } from "@/context/SessionProvider";

export const ProfileButton = () => {
  const { theme } = useTheme();
  const styles = profileButtonStyles(theme);
  const navigation = useNavigation<any>();
  const { user } = useSession();

  const handleProfilePress = () => {
    navigation.navigate("profile");
  };

  return (
    <TouchableOpacity
      style={styles.profile}
      activeOpacity={0.5}
      onPress={handleProfilePress}
      hitSlop={10}
    >
      <Image
        source={user?.image ? { uri: user?.image } : require("@/assets/images/logo-android.png")}
        style={[styles.profileImage, { width: user?.image ? "100%" : "140%", height: user?.image ? "100%" : "140%" }]}
      />
    </TouchableOpacity>
  );
};
