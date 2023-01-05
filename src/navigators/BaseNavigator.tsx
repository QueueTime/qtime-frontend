import { useContext, useState } from "react";

import { DefaultTheme, DarkTheme } from "@react-navigation/native";

import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "@contexts/auth";
import { TabNavigator } from "@navigators/TabNavigator";
import { SignInScreen } from "@screens/SignInScreen";
import { ThemeContext } from "@contexts/theme";
import { ReferralScreen } from "@screens/ReferralScreen";

export const BaseNavigator = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  /**
   * Temporary workaround for displaying the follow up screens after you sign-in
   * TODO: Update this to instead query the database to see if the user has
   *       accepted the terms of service.
   */
  const [isValidUser, setIsValidUser] = useState(false);

  if (!user) {
    return <SignInScreen />;
  }

  return (
    // Using the built-in theme setup from react-native.
    // Custom theme management of navbar elements can be accomplished with https://reactnavigation.org/docs/themes/
    <NavigationContainer
      theme={theme.name === "light" ? DefaultTheme : DarkTheme}
    >
      {isValidUser ? (
        <TabNavigator />
      ) : (
        <ReferralScreen
          onReferralComplete={() => {
            setIsValidUser(true);
          }}
        />
      )}
    </NavigationContainer>
  );
};
