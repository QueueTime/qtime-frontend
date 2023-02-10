import { StyleSheet } from "react-native";
import * as STYLES from "./styles";

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
        backgroundColor: STYLES.WHITE_COLOR,
      },
      text: {
        color: STYLES.BLACK_COLOR,
        fontSize: 15,
      },
      primaryText: {
        color: STYLES.PRIMARY_COLOR,
      },
      subText: {
        color: STYLES.WEAK_COLOR,
        fontSize: 14,
      },
      placeholderText: {
        color: STYLES.LIGHT_COLOR,
      },
      buttonColor: {
        color: STYLES.PRIMARY_COLOR,
      },
      primaryColor: {
        color: STYLES.PRIMARY_COLOR,
      },
      secondaryColor: {
        color: STYLES.WEAK_COLOR,
      },
      inactiveColor: {
        opacity: 0.2,
        color: "#ababab",
      },
      waitTimeSearchBar: {
        backgroundColor: STYLES.BACKGROUND_COLOR_LIGHT,
      },
      waitTimeModalHeader: {
        backgroundColor: STYLES.BACKGROUND_COLOR_LIGHT,
      },
      waitTimeModalSortButtons: {
        borderColor: STYLES.BACKGROUND_COLOR_LIGHT,
        backgroundColor: STYLES.BACKGROUND_COLOR_LIGHT,
      },
      border: {
        color: STYLES.BORDER_COLOR_LIGHT,
      },
      iconColorPOI: {
        color: STYLES.BLACK_COLOR,
      },
      confirmWaitTimeButton: {
        borderColor: STYLES.PRIMARY_COLOR,
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
        backgroundColor: STYLES.CONT_COLOR_DARK,
      },
      text: {
        color: STYLES.WHITE_COLOR,
        fontSize: 15,
      },
      primaryText: {
        color: STYLES.PRIMARY_COLOR,
      },
      subText: {
        color: STYLES.WEAK_COLOR,
        fontSize: 14,
      },
      placeholderText: {
        color: STYLES.LIGHT_COLOR,
      },
      buttonColor: {
        color: STYLES.PRIMARY_COLOR,
      },
      primaryColor: {
        color: STYLES.PRIMARY_COLOR,
      },
      secondaryColor: {
        color: STYLES.WEAK_COLOR,
      },
      inactiveColor: {
        color: STYLES.WEAK_COLOR,
      },
      waitTimeSearchBar: {
        backgroundColor: STYLES.CONT_COLOR_DARK,
      },
      waitTimeModalHeader: {
        backgroundColor: STYLES.BACKGROUND_COLOR_DARK,
      },
      waitTimeModalSortButtons: {
        borderColor: STYLES.BACKGROUND_COLOR_DARK,
        backgroundColor: STYLES.BACKGROUND_COLOR_DARK,
      },
      confirmWaitTimeButton: {
        borderColor: STYLES.PRIMARY_COLOR,
      },
      newWaitTimePlusMinusButton: {
        backgroundColor: STYLES.CONT_COLOR_DARK,
        borderColor: STYLES.PRIMARY_COLOR,
      },
      newWaitTimeTextContainer: {
        backgroundColor: STYLES.CONT_COLOR_DARK,
      },
    }), // Stylesheet with styles associated with theme
    antDesignOverride: {
      /*
        Add any values from the ant default theme you want to override here
        https://github.com/ant-design/ant-design-mobile-rn/blob/master/components/style/themes/default.tsx
      */
      primary_button_fill_tap: "#0e80d2",
      warning_button_fill_tap: "#d24747",

      primary_button_fill: STYLES.PRIMARY_COLOR,
      ghost_button_color: STYLES.PRIMARY_COLOR, // Ghost button outline
      checkbox_fill: STYLES.PRIMARY_COLOR, // Radio/checkbox button color
      fill_base: STYLES.CONT_COLOR_DARK, // Background color
      border_color_base: STYLES.WHITE_COLOR, // Line color
      search_bar_fill: STYLES.CONT_COLOR_DARK, // Outside search bar color
      radius_sm: 24, // Tag Radius
      tag_height: 35, // Tag Height
      button_font_size_sm: 15, // Tag Text Font Size
      color_text_caption: STYLES.WHITE_COLOR, // Tag Text Color
    },
  },
};

export const STORAGE_KEY: string = "QTIME_THEME";
