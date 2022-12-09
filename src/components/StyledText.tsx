import { StyleSheet, Text } from "react-native";

/**
 * Text wrapper component with global text style applied
 */
export const StyledText = ({ children, style, ...otherProps }: any) => (
  <Text {...otherProps} style={[styles.text, style]}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "WorkSans",
  },
});
