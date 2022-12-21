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
  return (
    <Text
      {...otherProps}
      style={[
        {
          fontFamily: fontWeight === "bold" ? "WorkSansBold" : "WorkSans",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

interface IStyledTextProps {
  children: React.ReactNode;
  style: any;
  fontWeight: "normal" | "bold";
}
