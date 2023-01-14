import { render, screen, fireEvent } from "@testing-library/react-native";

import { ReferralScreen } from "@screens/ReferralScreen";

import "@testing-library/jest-native/extend-expect";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// Test Utils
const textInputId = "referral-input-textbox";
const getTextInputBox = () => screen.getByTestId(textInputId);

describe("<ReferralScreen />", () => {
  it("accepts a valid referral code", async () => {
    render(<ReferralScreen />);
    const input = getTextInputBox();
    fireEvent.changeText(input, "ABCDEF");
    expect(input.props.value).toBe("ABCDEF");
    fireEvent(input, "submitEditing");
    expect(screen.queryByText("Invalid referral code. Try again.")).toBeNull();
    // TODO: Mock navigator and ensure it is called (once referral is not the last page)
  });

  it("validates input for referral codes of 6 characters", async () => {
    render(<ReferralScreen />);
    const input = getTextInputBox();
    fireEvent.changeText(input, "ABCDEG");
    expect(input.props.value).toBe("ABCDEG");
    fireEvent(input, "submitEditing");
    await screen.findByText("Invalid referral code. Try again.");
  });

  it("validates input for referral codes less than 6 characters", async () => {
    render(<ReferralScreen />);
    const input = getTextInputBox();
    fireEvent.changeText(input, "ABC");
    expect(input.props.value).toBe("ABC");
    fireEvent(input, "submitEditing");
    await screen.findByText("Code must be 6 characters long.");
  });

  it("allows progress if users don't have a referral code", () => {
    render(<ReferralScreen />);
    fireEvent.press(screen.getByText("I don't have one"));
    // TODO: Mock navigator and ensure it is called (once referral is not the last page)
  });
});
