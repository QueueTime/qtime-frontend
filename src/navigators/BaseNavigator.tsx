import { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
<<<<<<< HEAD
<<<<<<< HEAD
import { AuthContext } from "@contexts/auth";
=======
import { AuthContext } from "@contexts/authentication";
>>>>>>> Create base navigator to route bewteen signed in and not
=======
import { AuthContext } from "@contexts/auth";
>>>>>>> Rename authentication to auth context
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
