import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { WaitTimeScreen } from "@screens/WaitTimeScreen";
import { LocationDetailsScreen } from "@screens/LocationDetailsScreen";
import * as ROUTES from "@constants/routes";

// Types of parameters that are passed for each screen
type IProfileStackNavigatorParams = {
  [ROUTES.WAIT_TIMES_HOME]: undefined;
  [ROUTES.LOCATION_DETAILS]: { location: string };
};

// Stack component to use for navigation
const Stack = createNativeStackNavigator<IProfileStackNavigatorParams>();

/**
 * Handles navigation for the wait times section of the app
 */
export const WaitTimesNavigator = () => (
  <Stack.Navigator initialRouteName={ROUTES.WAIT_TIMES_HOME}>
    <Stack.Screen
      options={{ headerShown: false }}
      name={ROUTES.WAIT_TIMES_HOME}
      component={WaitTimeScreen}
    />
    <Stack.Screen
      options={({ route }) => ({
        title: route.params.location,
      })}
      name={ROUTES.LOCATION_DETAILS}
      component={LocationDetailsScreen}
    />
  </Stack.Navigator>
);
