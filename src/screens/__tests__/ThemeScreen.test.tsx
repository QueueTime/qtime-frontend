import { fireEvent, screen } from "@testing-library/react-native";

import { renderWithTheme } from "@utils/theme";
import { ThemeScreen } from "@screens/ThemeScreen";
import { THEME_NAMES } from "@constants/theme";

import "@testing-library/jest-native/extend-expect";

// Test Utils
const getInfoText = () =>
  screen.getByText("Customize the app", {
    exact: false,
  });

describe("<ThemeScreen />", () => {
  it("renders with the passed theme", () => {
    renderWithTheme(<ThemeScreen />, THEME_NAMES.dark);
    expect(getInfoText()).toHaveStyle({ color: "#FFFFFF" });
  });

  it("updates the theme on radio button selection", () => {
    renderWithTheme(<ThemeScreen />, THEME_NAMES.light);
    expect(getInfoText()).toHaveStyle({ color: "#000000" });
    // Select the dark radio button
    fireEvent.press(screen.getByText("Dark"));
    expect(getInfoText()).toHaveStyle({ color: "#FFFFFF" });
  });
});
