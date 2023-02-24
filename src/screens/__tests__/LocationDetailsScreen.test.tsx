import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { Provider } from "@ant-design/react-native";

import { LocationDetailsScreen } from "@screens/LocationDetailsScreen";

import "@testing-library/jest-native/extend-expect";

// Test Utils
const confirmButtonId = "confirmWaitTimeButton";
const submitButtonId = "submitWaitTimeButton";
const getConfirmWaitTimeButton = () => screen.getByTestId(confirmButtonId);
const getSubmitWaitTimeButton = () => screen.getByTestId(submitButtonId);

describe("<LocationDetailsScreen />", () => {
  const mockNavigate = jest.fn();
  const navigation: any = {
    navigate: mockNavigate,
    addListener: jest.fn().mockImplementation((event, callback) => {
      let e = { data: { action: "something" }, preventDefault: jest.fn() };
      callback(e);
    }),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("confirm success modal pops up when user confirms wait time", async () => {
    render(
      <Provider>
        <LocationDetailsScreen navigation={navigation} />
      </Provider>
    );
    fireEvent.press(getConfirmWaitTimeButton());

    const getModalText = () => screen.getByText("Wait Time Confirmed!");

    await waitFor(() => expect(getModalText()).toBeVisible(), {
      timeout: 200,
    });
    await waitFor(() => expect(getModalText()).not.toBeVisible(), {
      timeout: 2500,
    });
  });

  it("submit success modal pops up when user submits wait time", async () => {
    render(
      <Provider>
        <LocationDetailsScreen navigation={navigation} />
      </Provider>
    );
    fireEvent.press(getSubmitWaitTimeButton());

    const getModalText = () => screen.getByText("Wait Time Submitted!");

    await waitFor(() => expect(getModalText()).toBeVisible(), {
      timeout: 200,
    });
    await waitFor(() => expect(getModalText()).not.toBeVisible(), {
      timeout: 2500,
    });
  });
});
