import { render } from "@testing-library/react-native";

import { ThemeProvider, DEFAULT_CHOICE, ThemeChoice } from "@contexts/theme";

/**
 * Theme Testing Utils
 */

/**
 * A custom render to use theme provider to wrap normal components to test theming.
 * Extends regular render options and can pass the theme preference to render.
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
