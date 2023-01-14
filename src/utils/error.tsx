import { Toast } from "@ant-design/react-native";

// Display an error message toast
// Behavior consolidated here to facilitate refactoring
export const displayError = (msg: string) => {
  Toast.info({
    content: msg,
    duration: Toast.SHORT,
  });
};
