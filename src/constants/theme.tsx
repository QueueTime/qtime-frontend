import { StyleSheet } from "react-native";
import { PRIMARY_COLOR_LIGHT, PRIMARY_COLOR_DARK } from "./styles";

export const THEME_NAMES = {
  light: "light",
  dark: "dark",
  system: "system",
};

export const themes = {
  // Light theme
  light: {
    name: THEME_NAMES.light, // Name of theme
    styles: StyleSheet.create({
      screenContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: "#ffffff",
      },
      text: {
        color: "#000000",
        fontSize: 15,
      },
      subText: {
        color: "#808080",
        fontSize: 14,
      },
      primaryColor: {
        color: PRIMARY_COLOR_LIGHT,
      },
    }), // Stylesheet with styles associated with theme
    antDesignOverride: {
      /*
        Add any values from the ant default theme you want to override here
        https://github.com/ant-design/ant-design-mobile-rn/blob/master/components/style/themes/default.tsx
      */
    },
  },
  // Dark theme
  dark: {
    name: THEME_NAMES.dark,
    styles: StyleSheet.create({
      screenContainer: {
        flex: 1,
        padding: 15,
        paddingTop: 20,
        backgroundColor: "#222222",
      },
      text: {
        color: "#ffffff",
        fontSize: 15,
      },
      subText: {
        color: "#808080",
        fontSize: 14,
      },
      primaryColor: {
        color: PRIMARY_COLOR_DARK,
      },
    }), // Stylesheet with styles associated with theme
    antDesignOverride: {
      /*
        Add any values from the ant default theme you want to override here
        https://github.com/ant-design/ant-design-mobile-rn/blob/master/components/style/themes/default.tsx
      */
      primary_button_fill: "#a00ceb",
      ghost_button_color: "#a00ceb", // Ghost button outline
      checkbox_fill: "#bf40bf", // Radio/checkbox button color
      fill_base: "#222222", // Background color
      border_color_base: "#fffff", // Line color
    },
  },
};

export const STORAGE_KEY: string = "QTIME_THEME";
