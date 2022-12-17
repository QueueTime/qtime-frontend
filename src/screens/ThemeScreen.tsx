import { useContext, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import { Button, WhiteSpace } from "@ant-design/react-native";
import { Provider } from "@ant-design/react-native";

import { ThemeContext } from "@contexts/theme";

export const ThemeScreen = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    huge: {
      fontSize: 20,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={[styles.container, theme.styles.container]}>
      <Text style={[styles.huge, theme.styles.text]}>
        App Appearance Screen
      </Text>
      <Text style={[styles.huge, theme.styles.text]}>Theme: {theme.name}</Text>
      <WhiteSpace />
      <Button type={"primary"} onPress={() => changeTheme("light")}>
        Set light theme
      </Button>
      <Button type={"primary"} onPress={() => changeTheme("dark")}>
        Set dark theme
      </Button>
      <Button type={"primary"} onPress={() => changeTheme("system")}>
        Set system theme
      </Button>
    </View>
  );
};
