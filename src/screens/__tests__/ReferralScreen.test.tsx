import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";

import { ReferralScreen } from "@screens/ReferralScreen";

import "@testing-library/jest-native/extend-expect";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// Test Utils
const textInputId = "referral-input-textbox";
const getTextInputBox = () => screen.getByTestId(textInputId);

describe("<ReferralScreen />", () => {
  const mockOnReferralComplete = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("accepts a valid referral code", async () => {
    render(<ReferralScreen onReferralComplete={mockOnReferralComplete} />);
    const input = getTextInputBox();

    fireEvent.changeText(input, "ABCDEF");
    expect(input.props.value).toBe("ABCDEF");
    fireEvent(input, "submitEditing");

    expect(screen.queryByText("Invalid referral code. Try again.")).toBeNull();

    await waitFor(() => expect(mockOnReferralComplete).toBeCalledTimes(1), {
      timeout: 3500,
    });
  });

  it("validates input for referral codes of 6 characters", async () => {
    render(<ReferralScreen onReferralComplete={mockOnReferralComplete} />);
    const input = getTextInputBox();

    fireEvent.changeText(input, "ABCDEG");
    expect(input.props.value).toBe("ABCDEG");
    fireEvent(input, "submitEditing");
    await screen.findByText("Invalid referral code. Try again.");
  });

  it("validates input for referral codes less than 6 characters", async () => {
    render(<ReferralScreen onReferralComplete={mockOnReferralComplete} />);
    const input = getTextInputBox();

    fireEvent.changeText(input, "ABC");
    expect(input.props.value).toBe("ABC");
    fireEvent(input, "submitEditing");
    await screen.findByText("Code must be 6 characters long.");
  });

  it("allows progress if users don't have a referral code", () => {
    render(<ReferralScreen onReferralComplete={mockOnReferralComplete} />);
    fireEvent.press(screen.getByText("I don't have one"));
    expect(mockOnReferralComplete).toBeCalledTimes(1);
  });
});
