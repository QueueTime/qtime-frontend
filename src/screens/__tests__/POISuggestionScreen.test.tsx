import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { AxiosResponse } from "axios";
import { mock } from "jest-mock-extended";

import { Provider } from "@ant-design/react-native";
import { renderWithAuthContext } from "@utils/test";
import { poiApi } from "@api/client/apis";
import { POISuggestionScreen } from "@screens/POISuggestionScreen";

import "@testing-library/jest-native/extend-expect";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// Test Utils
const locationNameInputId = "locationNameInputBox";
const addInfoInputId = "additionalInfoInputBox";
const submitButtonId = "submitBtn";
const getLocationNameInputBox = () => screen.getByTestId(locationNameInputId);
const getAddInfoInputBox = () => screen.getByTestId(addInfoInputId);
const getSubmitButton = () => screen.getByTestId(submitButtonId);

describe("<POISuggestionScreen />", () => {
  it("accepts valid input and submits a suggestion", async () => {
    // Mock API to return 204
    poiApi.suggestNewPOI = jest.fn(() =>
      Promise.resolve(mock<AxiosResponse<void, any>>())
    );
    // Provider required here for some reason to not crash
    renderWithAuthContext(
      <Provider>
        <POISuggestionScreen />
      </Provider>
    );

    const nameInput = getLocationNameInputBox();
    const addInfoInput = getAddInfoInputBox();
    const NAME = "Sample Location Name";
    const ADD_INFO = "Some sample additional info";

    fireEvent.changeText(nameInput, NAME);
    expect(nameInput.props.value).toBe(NAME);
    fireEvent.changeText(addInfoInput, ADD_INFO);
    expect(addInfoInput.props.value).toBe(ADD_INFO);
    fireEvent.press(getSubmitButton());

    // Check modal text is visible
    const getModalText = () =>
      screen.getByText("Location suggestion submitted!");

    // Wait for modal to pop up
    await waitFor(() => expect(getModalText()).toBeVisible(), {
      timeout: 200,
    });
    // Wait for modal to dissapear
    await waitFor(() => expect(getModalText()).not.toBeVisible(), {
      timeout: 3000,
    });
  });

  it("validates input for empty location name", () => {
    render(<POISuggestionScreen />);
    fireEvent.press(getSubmitButton());
    // Verify the confirmation page is not shown
    expect(getSubmitButton()).toBeTruthy();
  });
});
