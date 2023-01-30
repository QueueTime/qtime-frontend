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
    iconColor: "black",
    refreshIconBackgroundColorAndroid: "white",
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
      placeholderText: {
        color: "#999999",
      },
      subText: {
        color: "#808080",
        fontSize: 14,
      },
      primaryColor: {
        color: PRIMARY_COLOR_LIGHT,
      },
      inactiveColor: {
        color: "#ababab",
      },
      waitTimeSearchBar: {
        backgroundColor: "#F5F5F5",
      },
      waitTimeModalHeader: {
        backgroundColor: "#FFFFFF",
      },
      waitTimeModalSortButtons: {
        borderColor: "#FFFFFF",
      },
      confirmWaitTimeButton: {
        borderColor: PRIMARY_COLOR_LIGHT,
      },
      newWaitTimePlusMinusButton: {
        backgroundColor: "#F5F5F5",
        borderColor: "#F5F5F5",
      },
      newWaitTimeTextContainer: {
        backgroundColor: "#F5F5F5",
      },
    }), // Stylesheet with styles associated with theme
    antDesignOverride: {
      /*
        Add any values from the ant default theme you want to override here
        https://github.com/ant-design/ant-design-mobile-rn/blob/master/components/style/themes/default.tsx
      */
      search_bar_fill: "#FFFFFF", // Outside search bar color
      radius_sm: 24, // Tag Radius
      tag_height: 35, // Tag Height
      button_font_size_sm: 15, // Tag Text Font Size
      color_text_caption: "#000000", // Tag Text Color
    },
  },
  // Dark theme
  dark: {
    name: THEME_NAMES.dark,
    iconColor: "white",
    refreshIconBackgroundColorAndroid: "white",
    styles: StyleSheet.create({
      screenContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: "#222222",
      },
      text: {
        color: "#ffffff",
        fontSize: 15,
      },
      placeholderText: {
        color: "#ffffff",
      },
      subText: {
        color: "#808080",
        fontSize: 14,
      },
      primaryColor: {
        color: PRIMARY_COLOR_DARK,
      },
      inactiveColor: {
        color: "#ababab",
      },
      waitTimeSearchBar: {
        backgroundColor: "#222222",
      },
      waitTimeModalHeader: {
        backgroundColor: "#2F2F2F",
      },
      waitTimeModalSortButtons: {
        borderColor: "#2F2F2F",
      },
      confirmWaitTimeButton: {
        borderColor: PRIMARY_COLOR_DARK,
      },
      newWaitTimePlusMinusButton: {
        backgroundColor: "#222222",
        borderColor: PRIMARY_COLOR_DARK,
      },
      newWaitTimeTextContainer: {
        backgroundColor: "#222222",
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
      border_color_base: "#FFFFFF", // Line color
      search_bar_fill: "#222222", // Outside search bar color
      radius_sm: 24, // Tag Radius
      tag_height: 35, // Tag Height
      button_font_size_sm: 15, // Tag Text Font Size
      color_text_caption: "#FFFFFF", // Tag Text Color
    },
  },
};

export const STORAGE_KEY: string = "QTIME_THEME";
