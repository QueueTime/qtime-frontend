import { useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button, WhiteSpace } from "@ant-design/react-native";

import { StyledText } from "@components/StyledText";

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
    <View style={styles.container}>
      <Text style={styles.huge}>Default Font Family Sample Text</Text>
      <StyledText style={styles.huge}>
        WorkSans Font Family Sample Text
      </StyledText>
      <WhiteSpace />
      <Button type={"primary"}>
        <StyledText>Sample Button Text</StyledText>
      </Button>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  huge: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
