import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";
import { useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

import { BaseNavigator } from "@navigators/BaseNavigator";
import { ThemeProvider } from "@contexts/theme";
import { AuthProvider } from "@contexts/auth";
import { ENVIRONMENT } from "@env";

import "expo-dev-client"; // Improve debugging when using dev-client

// Keep the splash screen visible fetching resources
SplashScreen.preventAutoHideAsync();

const App = () => {
  // Load fonts
  const [fontsLoaded] = useFonts({
    WorkSans: require("@assets/fonts/WorkSans-Regular.ttf"),
    WorkSansBold: require("@assets/fonts/WorkSans-Bold.ttf"),
    antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
    antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf"),
  });

  // Set an initializing state whilst Firebase connects
  const [isFirebaseInit, setIsFirebaseInit] = useState(true);

  useEffect(() => {
    if (ENVIRONMENT === "dev") {
      firestore().useEmulator("localhost", 8080);
      auth().useEmulator("http://localhost:9099");
    }
  }, []);

  // Memoized function to remove splash screen
  /**
   * Must be loaded/completed before splash screen is removed:
   * - Fonts loaded
   * - Firebase connection finished initializing
   */
  const onRootLayoutView = useCallback(async () => {
    if (fontsLoaded && !isFirebaseInit) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isFirebaseInit]);

  // Call the onRootLayoutView function to remove splash screen
  // This setup prevents it from being called multiple times
  useEffect(() => {
    onRootLayoutView();
  }, [onRootLayoutView]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider
      setFirebaseInitializing={setIsFirebaseInit}
      isFirebaseInitializing={isFirebaseInit}
    >
      <ThemeProvider>
        <BaseNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
