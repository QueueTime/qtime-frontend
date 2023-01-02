import React, { useContext } from "react";
import { View, Text } from "react-native";

import { render, screen, fireEvent } from "@testing-library/react-native";
import { Button } from "@ant-design/react-native";

import { ThemeContext } from "@contexts/theme";
import { renderWithTheme } from "@contexts/utils/theme.utils";

import "@testing-library/jest-native/extend-expect";

// Test Utils
const buttonTestId = "ant-button";
const getThemeName = () => screen.getByText(/^Current theme:/);
const getThemePref = () => screen.getByText(/^Current theme choice:/);
const getButton = () => screen.getByTestId(buttonTestId);
const flipTheme = (current: string) => (current === "light" ? "dark" : "light");

const SampleThemeConsumer = () => {
  const { theme, themePreference, changeTheme } = useContext(ThemeContext);
  return (
    <View>
      <Text>{"Current theme:" + theme.name}</Text>
      <Text>{"Current theme choice:" + themePreference}</Text>
      <Button
        type={"primary"}
        onPress={() => changeTheme(flipTheme(theme.name))}
        testID={buttonTestId}
      >
        <Text>Flip theme</Text>
      </Button>
    </View>
  );
};

describe("<ThemeProvider />", () => {
  const LIGHT = "light";
  const DARK = "dark";
  const SYSTEM = "system";

  it("renders the default theme and choice when missing a provider", () => {
    render(<SampleThemeConsumer />);
    expect(getThemeName()).toHaveTextContent(`Current theme:${LIGHT}`);
    expect(getThemePref()).toHaveTextContent(`Current theme choice:${SYSTEM}`);
  });

  it("renders the correct theme passed", () => {
    renderWithTheme(<SampleThemeConsumer />, DARK);
    expect(getThemeName()).toHaveTextContent(`Current theme:${DARK}`);
    expect(getThemePref()).toHaveTextContent(`Current theme choice:${DARK}`);
    expect(getButton()).toHaveStyle({
      backgroundColor: "#a00ceb",
    });
  });

  it("correctly updates the theme and re-renders components", async () => {
    renderWithTheme(<SampleThemeConsumer />, LIGHT);
    expect(getThemeName()).toHaveTextContent(`Current theme:${LIGHT}`);
    expect(getButton()).toHaveStyle({
      backgroundColor: "#108ee9",
    });

    // Push button to toggle from light to dark
    fireEvent.press(getButton());

    expect(getThemeName()).toHaveTextContent(`Current theme:${DARK}`);
    expect(getButton()).toHaveStyle({
      backgroundColor: "#a00ceb",
    });
  });
});
