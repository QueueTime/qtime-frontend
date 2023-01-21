import { render, screen, fireEvent } from "@testing-library/react-native";

import { OnboardingScreen } from "@screens/OnboardingScreen";

import "@testing-library/jest-native/extend-expect";

// Test Utils
const getOnbardingPageText = (pageNum: number) => {
  switch (pageNum) {
    case 1:
      return screen.getByText("Your connection is the key.");
    case 2:
      return screen.getByText("Help out your McMaster community.");
    case 3:
      return screen.getByText("Privacy is our number one priority.");
    default:
      return null;
  }
};
const exitButtonTestId = "exit-button";
const getExitButton = () => screen.getByTestId(exitButtonTestId);

describe("<OnboardingScreen />", () => {
  const mockOnExit = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("allows exiting of the onboarding pages", () => {
    render(<OnboardingScreen onExit={mockOnExit} />);
    expect(getOnbardingPageText(1)).toBeVisible();
    expect(getExitButton()).toBeVisible();
    fireEvent.press(getExitButton());
    expect(mockOnExit).toBeCalledTimes(1);
  });
});
