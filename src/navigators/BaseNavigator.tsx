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
      {userProfile?.hasCompletedOnboarding ? (
        <TabNavigator />
      ) : (
        <SignUpStackNavigator />
      )}
    </NavigationContainer>
  );
};
