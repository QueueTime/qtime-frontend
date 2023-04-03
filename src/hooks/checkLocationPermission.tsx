import { useRef, useState, useEffect } from "react";
import { Alert, AppState, Linking } from "react-native";

import * as Location from "expo-location";

export const useLocationPermission = () => {
  const appState = useRef(AppState.currentState);
  const [_, setAppStateVisible] = useState(appState.current);

  // Checking if the app is in foreground or background and triggering the fetch of background location permission each time the app is brought to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        Location.getBackgroundPermissionsAsync().then((response) => {
          if (!response.granted) {
            requestPermissions();
          }
        });
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);
};

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
      {
        text: "Later",
        style: "cancel",
      },
    ],
    {
      cancelable: true,
    }
  );
};
