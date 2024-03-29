import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { mock } from "jest-mock-extended";
import "@testing-library/jest-native/extend-expect";

import { ReferralScreen } from "@screens/ReferralScreen";
import { userApi } from "@api/client/apis";
import { AxiosResponse } from "axios";
import { renderWithAuthContext } from "@utils/test";

// Test Utils
const textInputId = "referral-input-textbox";
const getTextInputBox = () => screen.getByTestId(textInputId);

// Mock useNavigation hook
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      addListener: jest.fn(),
    }),
  };
});

describe("<ReferralScreen />", () => {
  const mockNavigate = jest.fn();
  const navigation: any = { navigate: mockNavigate };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("accepts a valid referral code", async () => {
    // Mock the api call to return a resolved promise
    userApi.submitReferralCode = jest.fn(() =>
      Promise.resolve(mock<AxiosResponse<void, any>>())
    );
    renderWithAuthContext(<ReferralScreen navigation={navigation} />);
    const input = getTextInputBox();
    fireEvent.changeText(input, "ABCDEF");
    expect(input.props.value).toBe("ABCDEF");
    fireEvent(input, "submitEditing");
    expect(screen.queryByText("Invalid referral code. Try again.")).toBeNull();

    await waitFor(() => expect(mockNavigate).toBeCalledTimes(1), {
      timeout: 3500,
    });
  });

  it("validates input for referral codes of 6 characters", async () => {
    // Mock the api call to return an error
    userApi.submitReferralCode = jest.fn(() =>
      Promise.reject({
        response: { status: 404 },
      })
    );
    renderWithAuthContext(<ReferralScreen navigation={navigation} />);
    const input = getTextInputBox();
    fireEvent.changeText(input, "ABCDEG");
    expect(input.props.value).toBe("ABCDEG");
    fireEvent(input, "submitEditing");
    await screen.findByText("Referral code not found. Try again.");
  });

  it("validates input for referral codes less than 6 characters", async () => {
    render(<ReferralScreen navigation={navigation} />);
    const input = getTextInputBox();
    fireEvent.changeText(input, "ABC");
    expect(input.props.value).toBe("ABC");
    fireEvent(input, "submitEditing");
    await screen.findByText("Code must be 6 characters long.");
  });

  it("allows progress if users don't have a referral code", () => {
    render(<ReferralScreen navigation={navigation} />);
    fireEvent.press(screen.getByText("I don't have one"));
    expect(mockNavigate).toBeCalledTimes(1);
  });
});
