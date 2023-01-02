import { render, screen, fireEvent } from "@testing-library/react-native";

import { ThemeProvider, DEFAULT_CHOICE, ThemeChoice } from "@contexts/theme";

/**
 * Theme Testing Utils
 */

/**
 * A custom render to setup providers. Extends regular
 * render options with `providerProps` to allow injecting
 * different scenarios to test with.
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
export const renderWithTheme = (
  children: React.ReactNode,
  startThemePreference: ThemeChoice = DEFAULT_CHOICE,
  renderOptions = {}
) => {
  return render(
    <ThemeProvider startThemePreference={startThemePreference}>
      {children}
    </ThemeProvider>,
    renderOptions
  );
};
