import { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "@contexts/auth";
import { TabNavigator } from "@navigators/TabNavigator";
import { SignInScreen } from "@screens/SignInScreen";

export const BaseNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <SignInScreen />}
    </NavigationContainer>
  );
};
