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
        backgroundColor: STYLES.WHITE_COLOR_LIGHT,
      },
      text: {
        color: STYLES.BLACK_COLOR_LIGHT,
        fontSize: 15,
      },
      primaryText: {
        color: STYLES.PRIMARY_COLOR_LIGHT,
      },
      subText: {
        color: STYLES.WEAK_COLOR_LIGHT,
        fontSize: 14,
      },
      placeholderText: {
        color: STYLES.LIGHT_COLOR_LIGHT,
      },
      buttonColor: {
        color: STYLES.PRIMARY_COLOR_LIGHT,
        transition: 0.25,
      },
      buttonHover: {
        opacity: 0.5,
        transition: 0.25,
      },
      primaryColor: {
        color: STYLES.PRIMARY_COLOR_LIGHT,
      },
      secondaryColor: {
        color: STYLES.WEAK_COLOR_LIGHT,
      },
      inactiveColor: {
        opacity: 0.2,
      },
      waitTimeSearchBar: {
        backgroundColor: STYLES.BACKGROUND_COLOR_LIGHT,
      },
      waitTimeModalHeader: {
        backgroundColor: STYLES.BLACK_COLOR_LIGHT,
      },
      waitTimeModalSortButtons: {
        borderColor: STYLES.BLACK_COLOR_LIGHT,
      },
      border: {
        color: STYLES.BORDER_COLOR_LIGHT,
      },
      iconColorPOI: {
        color: STYLES.BLACK_COLOR_LIGHT,
      },
      confirmWaitTimeButton: {
        borderColor: STYLES.PRIMARY_COLOR_LIGHT,
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
        color: STYLES.WHITE_COLOR_DARK,
        fontSize: 15,
      },
      primaryText: {
        color: STYLES.PRIMARY_COLOR_DARK,
      },
      subText: {
        color: STYLES.WEAK_COLOR_LIGHT,
        fontSize: 14,
      },
      placeholderText: {
        color: STYLES.LIGHT_COLOR_DARK,
      },
      buttonColor: {
        color: STYLES.PRIMARY_COLOR_DARK,
        transition: 0.25,
      },
      buttonHover: {
        opacity: 0.5,
        transition: 0.25,
      },
      primaryColor: {
        color: STYLES.PRIMARY_COLOR_DARK,
      },
      secondaryColor: {
        color: STYLES.WEAK_COLOR_DARK,
      },
      inactiveColor: {
        color: STYLES.WEAK_COLOR_DARK,
      },
      waitTimeSearchBar: {
        backgroundColor: STYLES.CONT_COLOR_DARK,
      },
      waitTimeModalHeader: {
        backgroundColor: STYLES.BACKGROUND_COLOR_DARK,
      },

      waitTimeModalSortButtons: {
        borderColor: STYLES.BACKGROUND_COLOR_DARK,
      },
      confirmWaitTimeButton: {
        borderColor: STYLES.PRIMARY_COLOR_DARK,
      },
      newWaitTimePlusMinusButton: {
        backgroundColor: STYLES.CONT_COLOR_DARK,
        borderColor: STYLES.PRIMARY_COLOR_DARK,
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
      primary_button_fill: "#a00ceb",
      ghost_button_color: STYLES.PRIMARY_COLOR_DARK, // Ghost button outline
      checkbox_fill: STYLES.PRIMARY_COLOR_DARK, // Radio/checkbox button color
      fill_base: STYLES.CONT_COLOR_DARK, // Background color
      border_color_base: STYLES.WHITE_COLOR_DARK, // Line color
      search_bar_fill: STYLES.CONT_COLOR_DARK, // Outside search bar color
      radius_sm: 24, // Tag Radius
      tag_height: 35, // Tag Height
      button_font_size_sm: 15, // Tag Text Font Size
      color_text_caption: STYLES.WHITE_COLOR_DARK, // Tag Text Color
    },
  },
};

export const STORAGE_KEY: string = "QTIME_THEME";
