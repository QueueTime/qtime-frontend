import React from "react";
import { StyleSheet, Text } from "react-native";

/**
 * Text wrapper component with global text style applied
 */
export const StyledText = ({
  children,
  style,
  fontWeight = "normal",
  ...otherProps
}: Partial<IStyledTextProps>) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: fontWeight === "bold" ? "WorkSansBold" : "WorkSans",
    },
  });

  return (
    <Text {...otherProps} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

interface IStyledTextProps {
  children: React.ReactNode;
  style: any;
  fontWeight: "normal" | "bold";
}
