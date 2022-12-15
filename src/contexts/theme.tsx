import React, { useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import * as SecureStore from "expo-secure-store";

import { themes, STORAGE_KEY } from "@constants/theme";

// Theme Defaults
const DEFAULT_CHOICE = "system";
const DEFAULT_THEME = themes.light;

type ThemeChoice = "system" | "light" | "dark";

export const ThemeContext = React.createContext({
  theme: DEFAULT_THEME,
  changeTheme: (_preference: ThemeChoice) => {},
});

/**
 * Theme context provider.
 * Exposes the `theme` and `changeTheme` properties.
 *
 * `theme` is the current app theme stylesheet.
 * `changeTheme()` is a function that changes the app's theme preferences.
 *
 * Usage:
 * import { ThemeContext } from "@contexts/theme"
 * const { theme, changeTheme } = useContext(ThemeContext)
 *
 * <... style={{ theme.brand_primary }} ...
 * <... onPress{() => changeTheme('dark')} ...
 */
export const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const [themePreference, setThemePreference] =
    useState<ThemeChoice>(DEFAULT_CHOICE);
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const colorScheme = useColorScheme();

  /**
   * Change the theme choice preference
   *
   * Stores the new theme preference in device storage
   * This will trigger a refresh of of the app's theme styling
   * @param preference New theme choice to use
   */
  const changeTheme = (newChoice: ThemeChoice) => {
    setThemePreference(newChoice);
    SecureStore.setItemAsync(STORAGE_KEY, newChoice);
  };

  // Pull the theme preference from device storage,
  // or use the default choice if none exists
  useEffect(() => {
    async function fetchStoredThemePreference() {
      try {
        const storedPreference = await SecureStore.getItemAsync(STORAGE_KEY);
        if (storedPreference) {
          setThemePreference(storedPreference as ThemeChoice);
        } else {
          // Store the default choice to retrieve for next time
          await SecureStore.setItemAsync(STORAGE_KEY, DEFAULT_CHOICE);
        }
      } catch (err) {
        // TODO: Should show a toast error here.
        console.log(`Error trying to fetch stored preference ${err}`);
      }
    }
    fetchStoredThemePreference();
  }, []); // Runs only ONCE

  // Set/Refresh the theme of the app whenever the preference
  // is changed or the system color theme changes
  useEffect(() => {
    if (
      themePreference == "light" ||
      (themePreference == "system" && colorScheme == "light")
    ) {
      setTheme(themes.light);
    } else if (
      themePreference == "dark" ||
      (themePreference == "system" && colorScheme == "dark")
    ) {
      setTheme(themes.dark);
    } else {
      setTheme(DEFAULT_THEME); // Default case
    }
  }, [themePreference, colorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

interface IThemeProviderProps {
  children: React.ReactNode;
}
