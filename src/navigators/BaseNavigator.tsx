import { useContext } from "react";

import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from "@react-navigation/native";

import { AuthContext } from "@contexts/auth";
import { TabNavigator } from "@navigators/TabNavigator";
import { SignInScreen } from "@screens/SignInScreen";
import { ThemeContext } from "@contexts/theme";
import { SignUpStackNavigator } from "./SignUpStackNavigator";
import { StatusBar } from "react-native";

export const BaseNavigator = () => {
  const { user, userProfile } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  /**
   * Show sign in screen if no Google user is signed-in
   * or if we haven't pulled the user's profile from firebase
   */
  if (!user || !userProfile) {
    return <SignInScreen />;
  }

  return (
    // Using the built-in theme setup from react-native.
    // Custom theme management of navbar elements can be accomplished with https://reactnavigation.org/docs/themes/
    <NavigationContainer
      theme={theme.name === "light" ? DefaultTheme : DarkTheme}
    >
      <StatusBar
        barStyle={theme.name === "light" ? "dark-content" : "light-content"}
        backgroundColor={
          theme.name === "light"
            ? DefaultTheme.colors.card
            : DarkTheme.colors.card
        } // Match the status bar background to the navigation topbar background (Android)
      />
      {userProfile?.hasCompletedOnboarding ? (
        <TabNavigator />
      ) : (
        <SignUpStackNavigator />
      )}
    </NavigationContainer>
  );
};
