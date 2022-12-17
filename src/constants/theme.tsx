import { StyleSheet } from "react-native";

export const themes = {
  // Light theme
  light: {
    name: "light", // Name of theme
    styles: StyleSheet.create({
      container: {
        backgroundColor: "#ffffff",
      },
      text: {
        color: "#000000",
      },
    }), // Stylesheet with styles associated with theme
    antDesignOverride: {
      /*
        Add any values from the ant default theme you want to override here
        https://github.com/ant-design/ant-design-mobile-rn/blob/master/components/style/themes/default.tsx
      */
      // primary_button_fill: "#34cb38",
    },
  },
  // Dark theme
  dark: {
    name: "dark",
    styles: StyleSheet.create({
      container: {
        backgroundColor: "#222222",
      },
      text: {
        color: "#ffffff",
      },
    }), // Stylesheet with styles associated with theme
    antDesignOverride: {
      /*
        Add any values from the ant default theme you want to override here
        https://github.com/ant-design/ant-design-mobile-rn/blob/master/components/style/themes/default.tsx
      */
      primary_button_fill: "#a00ceb",
    },
  },
};

export const STORAGE_KEY: string = "QTIME_THEME";
