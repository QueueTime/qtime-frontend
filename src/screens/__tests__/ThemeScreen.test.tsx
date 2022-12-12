import { render, screen, fireEvent } from "@testing-library/react-native";
import { ThemeScreen } from "@screens/ThemeScreen";

describe("<ThemeScreen />", () => {
  // Trivial test that checks if the component renders some text on the screen
  it("has the text app appearance screen", () => {
    render(<ThemeScreen />);

    const textComponent = screen.getByText("App Appearance Screen");
    expect(textComponent).toBeTruthy();
  });
});
