import { useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";

import { TabNavigator } from "@navigators/TabNavigator";
import { ThemeProvider } from "@contexts/theme";

// Keep the splash screen visible fetching resources
SplashScreen.preventAutoHideAsync();

const App = () => {
  // Load fonts
  const [fontsLoaded] = useFonts({
    WorkSans: require("@assets/fonts/WorkSans.ttf"),
  });

  // Memoized function to remove splash screen
  const onRootLayoutView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Call the onRootLayoutView function to remove splash screen
  // This setup prevents it from being called multiple times
  useEffect(() => {
    onRootLayoutView();
  }, [onRootLayoutView]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
