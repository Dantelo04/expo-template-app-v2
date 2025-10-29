import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { buttonStyles } from "./Button.style";
import { Text } from "../Text/Text";
import Google from "@/assets/icons/google.svg";
import { FontAwesome6 } from "@expo/vector-icons";

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: "primary" | "google" | "icon" | "apple";
  icon?: React.ReactNode;
}

export const Button = ({
  children,
  variant = "primary",
  icon,
  ...props
}: ButtonProps) => {
  const { theme } = useTheme();
  const styles = buttonStyles(theme);

  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity || props.disabled ? 1 : 0.5}
      {...props}
      style={[
        styles.button,
        styles[variant],
        props.style,
        { opacity: props.disabled ? 0.5 : 1 },
      ]}
    >
      {variant === "google" && <Google style={{paddingVertical: 10}}/>}
      {variant === "apple" && <FontAwesome6 name="apple" size={28} color={theme.colors.text.primary} style={{marginTop: -2}}/>}
      <Text variant={variant === "google" || variant === "apple" ? "button_brand" : "button"} style={styles.text} numberOfLines={1}>
        {children}
      </Text>
      {variant === "icon" && icon}
    </TouchableOpacity>
  );
};
