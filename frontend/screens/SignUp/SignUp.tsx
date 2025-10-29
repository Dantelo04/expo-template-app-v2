import { useState } from "react";
import { useSession } from "@/context/SessionProvider";
import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";
import { View } from "react-native";
import { Text } from "@/components/Text/Text";
import { signUpStyles } from "./SignUp.styles";
import { useTheme } from "@/context/ThemeContext";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Link } from "@/components/Link/Link";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signUp, error, isLoading } = useSession();
  const { theme } = useTheme();
  const styles = signUpStyles(theme);

  const handleSignUp = async () => {
    await signUp(email, password, name);
  };
  return (
    <View style={styles.container}>
      <Text variant="title">Sign Up</Text>
      <View style={styles.content}>
        {error ? (
          <Text variant="subtitle" style={styles.error}>
            {error}
          </Text>
        ) : null}
        <Input
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        />
        <Input
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button onPress={handleSignUp} disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>
      </View>
      <Link href="/sign-in">Already have an account? Sign in</Link>
    </View>
  );
};
