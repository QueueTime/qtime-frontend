import { useContext } from "react";

import { DefaultTheme, DarkTheme } from "@react-navigation/native";

import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "@contexts/auth";
import { TabNavigator } from "@navigators/TabNavigator";
import { SignInScreen } from "@screens/SignInScreen";
import { ThemeContext } from "@contexts/theme";

export const BaseNavigator = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  return (
    // Using the built-in theme setup from react-native.
    // Custom theme management of navbar elements can be accomplished with https://reactnavigation.org/docs/themes/
    <NavigationContainer
      theme={theme.name === "light" ? DefaultTheme : DarkTheme}
    >
      {user ? <TabNavigator /> : <SignInScreen />}
    </NavigationContainer>
  );
};
