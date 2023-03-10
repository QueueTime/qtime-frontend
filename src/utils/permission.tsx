import { Linking, Alert } from "react-native";

export const requestPermissions = () => {
  Alert.alert(
    "Allow Location Access",
    "In order to use this app to its full potential, please allow location access. Set location access to 'Always' for the best experience.",
    [
      {
        text: "Open Settings",
        style: "default",
        onPress: () => Linking.openSettings(),
      },
    ]
  );
};
